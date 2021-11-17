import Game from './dominoes/Game';
export default class GameHandler {
  constructor(scene) {
    this.currentGame = null;
    this.currentPlayerHands = {};
    this.dominoPile = [];
    this.createGame = (type, players) => {
      if (this.currentGame) {
        this.endGame();
      }
      this.currentGame = new Game({
        gameType: type,
        totalPlayers: players.length,
      });
      for (let name of players) {
        this.currentPlayerHands[name] = [];
      }
      scene.DominoHandler.layoutDominoes(250, 200);
      return this.currentGame;
    };
    this.startGame = () => {
      const names = Object.keys(this.currentPlayerHands);
      this.firstPlayer = names[0];
      this.secondPlayer = names[1];
      scene.DominoHandler.shuffleDominoes();
      const sceneDominoes = scene.DominoHandler.dominoes;
      let giveToFirst = true;
      for (let dom of sceneDominoes) {
        if (
          this.currentPlayerHands[this.firstPlayer].length === 7 &&
          this.currentPlayerHands[this.secondPlayer].length === 7
        ) {
          this.dominoPile.push(dom);
        } else {
          giveToFirst
            ? this.currentPlayerHands[this.firstPlayer].push(dom)
            : this.currentPlayerHands[this.secondPlayer].push(dom);
          giveToFirst = !giveToFirst;
        }
      }
      console.log(this.currentPlayerHands);
      this.renderPlayersHands();
      // have player's name to determine which hand to give dominoes

      // deal shuffled dominoes
      // making sure that player dominoes is reveal and bot dominoes aren't
      // bot automatically playes double six if not current turn is player and wait for draggable input sprite to hit zone
      // if no double six try double 5 etc
      // place dominoes in dropzone
    };
    this.renderPlayersHands = () => {
      const playerFrames = this.currentPlayerHands[this.firstPlayer].map(
        (domino) => domino.frame
      );
      const playerDominoesGroup = scene.add.group([
        {
          key: 'white_dominoes',
          frame: playerFrames,
          setScale: { x: 2, y: 2 },
          setXY: {
            x: 200,
            y: 525,
            stepX: 30,
            stepY: 0,
          },
        },
      ]);
      playerDominoesGroup.rotate(1.5708);
    };
    this.endGame = () => {
      this.currentGame = null;
    };
  }
}
