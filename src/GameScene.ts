import GameObject from './GameObject';
import HtmlRenderer from './component/HtmlRenderer';

export default class GameScene {
    protected __gameObjects: Map<string, GameObject> = new Map();
    protected __sceneElement: HTMLElement = document.createElement('div');
    name: string;

    constructor(name: string, ...gameObjects: GameObject[]) {
        this.name = name;
        this.insert(...gameObjects);
    }
    insert(...gameObjects: GameObject[]) {
        gameObjects.forEach(gameObject => {
            const div = gameObject.getComponent<HtmlRenderer>("element");
            this.__gameObjects.set(gameObject.name, gameObject);
            this.__sceneElement.append(div.element);
        });
    }
    getElement() {
        return this.__sceneElement;
    }
}
