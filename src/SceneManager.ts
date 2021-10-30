import reactive, { Reactive } from '@aldinh777/reactive';
import GameScene from './GameScene';

export default class SceneHandler {
    protected __scenes: Map<string, GameScene> = new Map();
    
    sceneName: Reactive<string> = reactive();
    activeGameScene: Reactive<GameScene | undefined> = reactive((sceneName) => this.__scenes.get(sceneName), this.sceneName);

    addScene(gameScene: GameScene) {
        this.__scenes.set(gameScene.name, gameScene);
    }
    bindToElement(elem: HTMLElement) {
        this.activeGameScene.onChange((scene, ev) => {
            if (ev.oldValue) {
                elem.removeChild(ev.oldValue.getElement());
            }
            if (scene) {
                elem.append(scene.getElement());
            }
        }, true);
    }
    changeScene(name: string) {
        this.sceneName.value = name;
    }
}
