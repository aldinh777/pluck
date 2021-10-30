import reactive, { Reactive } from '@aldinh777/reactive';
import Component from './Component';
import SpriteRenderer from './SpriteRenderer';
import Animation from '../animation/Animation';

export default class Animator extends Component {
    protected __animations: Map<string, Animation> = new Map();
    state: Reactive<string> = reactive();

    init(): void {
        const sr = this.gameObject.getComponent<SpriteRenderer>("sprite");
        for (const anim of Array.from(this.__animations.values())) {
            anim.bindSprite(sr.sprite);
        }
        this.state.onChange((state, ev) => {
            if (ev.oldValue) {
                const animation = this.__animations.get(ev.oldValue);
                if (animation) {
                    animation.stop();
                }
            }
            const animation = this.__animations.get(state);
            if (animation) {
                animation.stop();
            }
        });
    }
    setAnimation(name: string, anim: Animation) {
        this.__animations.set(name, anim);
    }
    playAnimation(state: string) {
        this.state.value = state;
    }
}
