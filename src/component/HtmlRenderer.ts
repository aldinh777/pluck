import Component from "./Component";

export default class HtmlRenderer extends Component {
    element: HTMLDivElement = document.createElement('div');
    style!: CSSStyleDeclaration;

    init(): void {
        this.style = this.element.style;
        this.style.position = 'absolute';
    }

    setStyle(obj: any) {
        for (const key in obj) {
            const styleValue = obj[key];
            const style = this.style as any;
            style[key] = styleValue;
        }
    }
}
