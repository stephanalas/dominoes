import Game from './dominoes/Game';
export default class GameHandler {
  constructor(scene) {
    this.currentGame = null;

    this.createGame = (type, playerCount) => {
      if (this.currentGame) {
        this.endGame();
      }
      this.currentGame = new Game({
        gameType: type,
        totalPlayers: playerCount,
      });
      scene.DominoHandler.layoutDominoes(250, 200);
      return this.currentGame;
    };
    this.startGame = () => {
      // deal shuffled dominoes
      // making sure that player dominoes is reveal and bot dominoes aren't
      // bot automatically playes double six if not current turn is player and wait for draggable input sprite to hit zone
      // if no double six try double 5 etc
      // place dominoes in dropzone
    };
    this.endGame = () => {
      this.currentGame = null;
    };
  }
}
