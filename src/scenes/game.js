import UIHandler from '../helpers/uiHandler';
import whiteDominoesImage from '../assets/black_and_white_dominoes.png';
import blankDominoesImage from '../assets/blanks.png';
export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'Game',
    });
  }
  preload() {
    const DOMINOES_HEIGHT_WIDTH = {
      frameWidth: 32,
      frameHeight: 16,
    };
    this.load.spritesheet(
      'white_dominoes',
      whiteDominoesImage,
      DOMINOES_HEIGHT_WIDTH
    );
    this.load.spritesheet('blanks', blankDominoesImage, DOMINOES_HEIGHT_WIDTH);
  }
  create() {
    this.UIHandler = new UIHandler(this);
    this.UIHandler.buildUI();
    this.add.image(500, 400, 'white_dominoes');
  }
  update() {}
}
