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
      // scene.DominoHandler.layoutDominoes(250, 200);
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
      this.renderDominoPile(40, 100);
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
      const opponentFrames = this.currentPlayerHands[this.secondPlayer].map(
        (domino) => domino.frame
      );
      console.log(opponentFrames);
      // create empty phaser group to game scene
      // iterate through player hand
      // check domino for points
      // if points === 0 then sprite = 'blanks'
      // add to empty group

      const playerDominoesGroup = scene.add.group([
        {
          key: 'white_dominoes',
          frame: playerFrames,
          setScale: { x: 2, y: 2 },
          setXY: {
            x: 250,
            y: 550,
            stepX: 45,
            stepY: 0,
          },
        },
      ]);
      const opponentDominoesGroup = scene.add.group([
        {
          key: 'white_dominoes',
          frame: opponentFrames,
          setScale: { x: 2, y: 2 },
          setXY: {
            x: 250,
            y: 40,
            stepX: 45,
            stepY: 0,
          },
        },
      ]);
      playerDominoesGroup.rotate(1.5708);
      opponentDominoesGroup.rotate(1.5708);
      scene.InteractivityHandler.setGroupInteractive(
        playerDominoesGroup.children.entries
      );
    };
    this.checkForBlank = (group) => {
      group.children.entries.map;
    };
    this.renderDominoPile = (x, y) => {
      // when rendering dominos, dominos do not have data associated unless it is render using instance function

      // stores domino sprites while looking for blank domino to render blank
      const dominoPileSprites = this.dominoPile.map((domino) =>
        !domino.points ? domino.render(0, 0, 'blanks') : domino.render(0, 0)
      );

      // new domino group
      const dominoPileGroup = new Phaser.GameObjects.Group();
      // adding sprites to group
      dominoPileSprites.forEach((domino) =>
        dominoPileGroup.children.entries.push(domino)
      );
      // position dominoes
      dominoPileGroup.setXY(x, y, 0, 25);
    };
    this.endGame = () => {
      this.currentGame = null;
    };
  }
}
