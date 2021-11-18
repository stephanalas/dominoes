import UIHandler from '../helpers/uiHandler';
import whiteDominoesImage from '../assets/black_and_white_dominoes.png';
import blankDominoesImage from '../assets/blanks.png';
import DominoHandler from '../helpers/DominoHandler';
import GameHandler from '../helpers/GameHandler';
import InteractiveHandler from '../helpers/InteractivityHandler';
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
    this.DominoHandler = new DominoHandler(this);
    this.GameHandler = new GameHandler(this);
    this.InteractivityHandler = new InteractiveHandler(this);
    // this.DominoHandler.layoutDominoes(200, 200);

    // this.UIHandler.buildGrid();
    this.UIHandler.buildSinglePlayerUI();

    this.DominoHandler.createDominoes();
    // this.DominoHandler.layoutDominoes(250, 200, this.dominoes);

    const currentGame = this.GameHandler.createGame('singlePlayer', [
      'curvy',
      'bot',
    ]);
    this.GameHandler.startGame();
    console.log('game has started');

    this.input.on('drag', (pointer, gameObj, dragX, dragY) => {
      gameObj.x = dragX;
      gameObj.y = dragY;
    });
  }
  update() {}
}
