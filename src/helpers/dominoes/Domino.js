export default class Domino {
  constructor(scene, points) {
    this.points = points;
    this.left = points[0];
    this.right = points[1];
    this.inverseLeft = points[1];
    this.inverseRight = points[0];
    this.frame;
    this.inverseFrame;
    this.renderBlank = () => {};
    this.render = (x, y, type, frame) => {
      // render dominos in game as player dominos
      let sprite;
      if (type === 'player') {
        sprite = 'white_dominoes';
      } else {
        sprite = 'blanks';
      }
      // .sprite you can set frame from spritesheet
      let domino = scene.add
        .sprite(x, y, sprite, frame)
        .setScale(2, 2)
        .setInteractive()
        .setData({
          left: this.points[0],
          right: this.points[1],
          frame: frame,

          inverseLeft: this.inverseLeft,
          inverseRight: this.inverseRight,
          type: type,
          sprite: sprite,
          totalPoints: this.points.reduce((a, b) => a + b, 0),
        });
      if (type === 'player') {
        scene.input.setDraggable(domino);
      }
      return domino;
    };
  }
  get() {}
}
