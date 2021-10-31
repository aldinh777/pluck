import GameObject from '../GameObject';

export default abstract class Component {
    protected gameObject!: GameObject;

    abstract init(): void;
    bindGameObject(gameObject: GameObject) {
        this.gameObject = gameObject;
        this.init();
    }
}
