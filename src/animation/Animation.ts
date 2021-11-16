import reactive, { Reactive, Unsubscriber } from '@aldinh777/reactive';
import Frame from './Frame';

type ReactiveState = Reactive<'playing' | 'stopped'>;

export default class Animation {
    protected __unsubscribers: Unsubscriber[] = [];
    protected __currentIndex: Reactive<number> = reactive(0);
    protected __frame: Reactive<Frame>;
    protected __nextTimeout!: ReturnType<typeof setTimeout>;
    protected __sprite!: Reactive<HTMLImageElement>;
    state: ReactiveState = reactive('stopped') as ReactiveState;

    constructor(public frames: Frame[]) {
        this.__frame = reactive((index) => this.frames[index], this.__currentIndex);
        this.state.onEquals('playing', () => {
            const unsubIndex = this.__currentIndex.when(
                (index) => index >= this.frames.length,
                (_, ev) => {
                    ev.cancel();
                    this.__currentIndex.value = 0;
                }
            );
            const unsubSpriteBind = this.__frame.onChange((frame) => {
                this.__sprite.value = frame.element;
                this.__nextTimeout = setTimeout(() =>
                    this.__currentIndex.value = this.__currentIndex.value + 1, frame.delay);
            }, true);
            this.__unsubscribers = [unsubIndex, unsubSpriteBind];
        });
        this.state.onEquals('stopped', () => {
            this.__unsubscribers.forEach((unsubscribe) => unsubscribe());
            clearTimeout(this.__nextTimeout);
        });
    }
    bindSprite(sprite: Reactive<HTMLImageElement>): void {
        this.__sprite = sprite;
    }
    loadAssets(): Node[] {
        return this.frames.map((fr: Frame) => fr.loadElement());
    }
    play(): void {
        this.state.value = 'playing';
    }
    stop(): void {
        this.state.value = 'stopped';
    }
}
