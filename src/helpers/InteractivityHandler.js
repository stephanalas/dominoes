export default class InteractiveHandler {
  constructor(scene) {
    this.setGroupInteractive = (groupChildren) => {
      groupChildren.forEach((child) => {
        child.setInteractive();
        scene.input.setDraggable(child);
      });
    };
  }
}
