import reactive, { Reactive } from '@aldinh777/reactive';
import Component from './Component';

export default class SpriteRenderer extends Component {
    sprite: Reactive<HTMLImageElement> = reactive();

    init(): void {
        const div = this.gameObject.htmlElement;
        this.sprite.onChange((sprite, ev) => {
            if (ev.oldValue) {
                div.element.removeChild(ev.oldValue);
            }
            div.element.appendChild(sprite);
        });
    }
}
