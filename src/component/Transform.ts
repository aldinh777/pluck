import reactive, { Reactive } from '@aldinh777/reactive';
import Component from './Component';

export default class Transform extends Component {
    x: Reactive<number> = reactive(0);
    y: Reactive<number> = reactive(0);
    width: Reactive<number> = reactive(100);
    height: Reactive<number> = reactive(100);

    init() {
        const toPixel = (r: any) => r.toString() + 'px';
        const div = this.gameObject.htmlElement;
        this.x.bindValue(div.style, 'left', toPixel);
        this.y.bindValue(div.style, 'top', toPixel);
        this.width.bindValue(div.style, 'width', toPixel);
        this.height.bindValue(div.style, 'height', toPixel);
    }
    setPos(x: number, y: number) {
        this.x.value = x;
        this.y.value = y;
    }
    setSize(width: number, height: number) {
        this.width.value = width;
        this.height.value = height;
    }
}
