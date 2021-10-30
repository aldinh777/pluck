import reactive, { Reactive } from "@aldinh777/reactive";

export default class Frame {
    protected __flipped: Reactive<boolean> = reactive(false as boolean);
    protected __mirrored: Reactive<boolean> = reactive(false as boolean);
    protected __scale: Reactive<string> = reactive((mirrored, flipped) => {
        return `scaleX(${mirrored ? -1 : 1}) scaleY(${flipped ? -1 : 1})`;
    }, this.__mirrored, this.__flipped);
    element: HTMLImageElement = document.createElement("img");

    constructor(public src: string, public delay: number) {
        this.element.src = src;
        this.element.alt = src;
        this.element.style.width = "100%";
        this.element.style.height = "100%";
        this.__scale.bindValue(this.element.style, "transform");
    }
    loadElement(): Node {
        return this.element;
    }
    mirror() {
        this.__mirrored.value = !this.__flipped.value;
        return this;
    }
    flip() {
        this.__flipped.value = !this.__flipped.value;
        return this;
    }
    static asset(path: string, ms: number) {
        return new Frame(path, ms);
    }
}