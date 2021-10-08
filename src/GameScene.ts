import GameObject from './GameObject';
import HtmlRenderer from './component/HtmlRenderer';

export default class GameScene {
    protected __gameObjects: GameObject[];

    constructor(...gameObjects: GameObject[]) {
        this.__gameObjects = [];
        this.insert(...gameObjects);
    }
    insert(...gameObjects: GameObject[]) {
        this.__gameObjects.push(...gameObjects);
    }
    load(element: HTMLElement) {
        element.append(...this.__gameObjects.map((gameObject) => {
            const div = gameObject.getComponent<HtmlRenderer>("element");
            return div.element;
        }));
    }
}
