import GameObject from './GameObject';

export default abstract class GameScene {
    protected __gameObjects: Map<string, GameObject> = new Map();
    protected __sceneElement: HTMLElement = document.createElement('div');

    constructor(public name: string) { }
    abstract init(): void;
    insert(...gameObjects: GameObject[]) {
        gameObjects.forEach(gameObject => {
            this.__gameObjects.set(gameObject.name, gameObject);
            this.__sceneElement.append(gameObject.htmlElement.element);
        });
    }
    getHtmlElement() {
        return this.__sceneElement;
    }
}
