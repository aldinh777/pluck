import reactive, { Reactive, Unsubscriber, increase } from "@aldinh777/reactive";
import Frame from './Frame';

type ReactiveState = Reactive<"playing" | "stopped">;

export default class Animation {
    protected __unsubscribers: Unsubscriber[] = [];
    protected __currentIndex: Reactive<number> = reactive(0);
    protected __frame: Reactive<Frame>;
    protected __nextTimeout!: ReturnType<typeof setTimeout>;
    protected __sprite!: Reactive<HTMLImageElement>;

    frames: Frame[] = [];
    state: ReactiveState = reactive("stopped") as ReactiveState;

    constructor(frames: Frame[]) {
        this.frames = frames;
        this.__frame = reactive((index) => this.frames[index], this.__currentIndex);
        this.state.when(
            (state) => state === "playing",
            () => {
                const unsubIndex = this.__currentIndex.when(
                    (index) => index >= this.frames.length,
                    (_, ev) => {
                        ev.preventNext();
                        ev.preventReaction();
                        this.__currentIndex.value = 0;
                    }
                );
                const unsubSpriteBind = this.__frame.onChange((frame) => {
                    this.__sprite.value = frame.element;
                    this.__nextTimeout = setTimeout(() => increase(this.__currentIndex), frame.delay);
                }, true);
                this.__unsubscribers = [unsubIndex, unsubSpriteBind];
            }
        );
        this.state.when(
            (state) => state === "stopped",
            () => {
                this.__unsubscribers.forEach((unsubscribe) => unsubscribe());
                clearTimeout(this.__nextTimeout);
            }
        );
    }
    bindSprite(sprite: Reactive<HTMLImageElement>): void {
        this.__sprite = sprite;
    }
    loadAssets(): Node[] {
        return this.frames.map((fr: Frame) => fr.loadElement());
    }
    play(): void {
        this.state.value = "playing";
    }
    stop(): void {
        this.state.value = "stopped";
    }
}
