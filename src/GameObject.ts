import Component from './component/Component';
import HtmlRenderer from './component/HtmlRenderer';
import Transform from './component/Transform';
import SpriteRenderer from './component/SpriteRenderer';

export default class GameObject {
    protected __components: Map<string, Component> = new Map();
    name: string;

    constructor(name: string) {
        this.name = name;
        this.addComponent("element", new HtmlRenderer());
        this.addComponent("transform", new Transform());
        this.addComponent("sprite", new SpriteRenderer());
    }
    pos(x: number, y: number) {
        const t = this.getComponent<Transform>('transform');
        t.x.value = x;
        t.y.value = y;
        return this;
    }
    size(width: number, height: number) {
        const t = this.getComponent<Transform>('transform');
        t.width.value = width;
        t.height.value = height;
        return this;
    }
    style(styles: any) {
        const div = this.getComponent<HtmlRenderer>('element');
        div.setStyle(styles);
        return this;
    }
    addComponent(name: string, comp: Component): void {
        comp.bindGameObject(this);
        this.__components.set(name, comp);
    }
    getComponent<T extends Component>(name: string): T {
        return this.__components.get(name) as T;
    }
    onClick(listener: (ev: MouseEvent) => any): void {
        const div = this.getComponent<HtmlRenderer>("element");
        div.element.addEventListener('mousedown', listener);
    }
    onKeyPress(key: string, listener: (ev: KeyboardEvent) => any): void {
        document.body.addEventListener('keydown', ev => {
            if (ev.key === key) {
                listener(ev);
            }
        });
    }
}
