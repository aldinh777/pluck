import GameObject from './GameObject';
import HtmlRenderer from './component/HtmlRenderer';
import SceneManager from './SceneManager';

export default abstract class GameScene {
    protected __gameObjects: Map<string, GameObject> = new Map();
    protected __sceneElement: HTMLElement = document.createElement('div');

    constructor(public name: string) { }
    abstract init(sceneManager: SceneManager): void;
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
