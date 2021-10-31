import reactive, { Reactive } from '@aldinh777/reactive';
import GameScene from './GameScene';

export default class SceneManager {
    protected __scenes: Map<string, GameScene> = new Map();
    scene: Reactive<string> = reactive();
    gameScene: Reactive<GameScene | undefined> = reactive((sceneName) => this.__scenes.get(sceneName), this.scene);

    addScene(...gameScenes: GameScene[]) {
        gameScenes.forEach(gameScene => {
            this.__scenes.set(gameScene.name, gameScene);
            gameScene.init();    
        });
    }
    bindToElement(elem: HTMLElement) {
        this.gameScene.onChange((scene, ev) => {
            if (ev.oldValue) {
                elem.removeChild(ev.oldValue.getHtmlElement());
            }
            if (scene) {
                elem.append(scene.getHtmlElement());
            }
        }, true);
    }
    changeScene(name: string) {
        this.scene.value = name;
    }
}
