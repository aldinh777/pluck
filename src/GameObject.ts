import Component from './component/Component';
import HtmlRenderer from './component/HtmlRenderer';
import Transform from './component/Transform';

interface GameObjectInitializer {
    size?: { width: number; height: number; };
    pos?: { x: number; y: number; };
    style?: any;
}

export default class GameObject {
    protected __components: Map<string, Component> = new Map();
    htmlElement: HtmlRenderer = new HtmlRenderer();
    transform: Transform = new Transform();

    constructor(public name: string, initializer: GameObjectInitializer) {
        if (initializer.size) {
            const { width, height } = initializer.size;
            this.transform.setSize(width, height);
        }
        if (initializer.pos) {
            const { x, y } = initializer.pos;
            this.transform.setPos(x, y);
        }
        if (initializer.style) {
            this.htmlElement.setStyle(initializer.style);
        }
    }
    addComponent(name: string, comp: Component): void {
        comp.bindGameObject(this);
        this.__components.set(name, comp);
    }
    getComponent<T extends Component>(name: string): T | undefined {
        return this.__components.get(name) as T;
    }
    onClick(listener: (ev: MouseEvent) => any): void {
        this.htmlElement.element.addEventListener('mousedown', listener);
    }
    onKeyPress(key: string, listener: (ev: KeyboardEvent) => any): void {
        document.body.addEventListener('keydown', ev => {
            if (ev.key === key) {
                listener(ev);
            }
        });
    }
}
