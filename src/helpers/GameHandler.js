import Game from './dominoes/Game';
export default class GameHandler {
  constructor(scene) {
    this.currentGame = null;
    this.createGame = (type, players) => {
      if (this.currentGame) {
        this.endGame();
      }
      this.currentGame = new Game({
        gameType: type,
        totalPlayers: players.length,
      });
      // create player hands
      for (let name of players) {
        this.currentGame.currentPlayerHands[name] = [];
      }
      return this.currentGame;
    };
    this.startGame = () => {
      const { currentPlayerHands, dominoPile } = this.currentGame;
      // assign first and second player to game object
      const names = Object.keys(currentPlayerHands);
      this.currentGame.firstPlayer = names[0];
      this.currentGame.secondPlayer = names[1];

      // shuffle dominoes but not sprites of dominoes
      scene.DominoHandler.shuffleDominoes();
      const sceneDominoes = scene.DominoHandler.dominoes;

      // the dominoes in pile and dominoes in players' hand should be sprites

      // deal dominoes
      // eventually move to dominoHandler as instance method
      const { firstPlayer, secondPlayer } = this.currentGame;
      let giveToFirst = true;
      for (let dom of sceneDominoes) {
        if (
          currentPlayerHands[firstPlayer].length === 7 &&
          currentPlayerHands[secondPlayer].length === 7
        ) {
          dominoPile.push(dom);
        } else {
          giveToFirst
            ? currentPlayerHands[firstPlayer].push(dom)
            : currentPlayerHands[secondPlayer].push(dom);
          giveToFirst = !giveToFirst;
        }
      }
      // render both player hands
      this.renderPlayersHands();
      // render dominoPile
      this.renderDominoPile(40, 100);
      //
      this.firstMove();
      // have player's name to determine which hand to give dominoes

      // deal shuffled dominoes
      // making sure that player dominoes is reveal and bot dominoes aren't
      // bot automatically playes double six if not current turn is player and wait for draggable input sprite to hit zone
      // if no double six try double 5 etc
      // place dominoes in dropzone
    };
    this.getSprites = (dominos) => {
      return dominos.map((domino) =>
        !domino.points ? domino.render(0, 0, 'blanks') : domino.render(0, 0)
      );
    };
    this.renderPlayersHands = () => {
      const { currentPlayerHands } = this.currentGame;

      // groups sprite from player hand and adds it to scene
      const playerDominoSprites = this.getSprites(
        currentPlayerHands[this.currentGame.firstPlayer]
      );

      const playerDominoesGroup = new Phaser.GameObjects.Group(scene);

      // using Phaser group.addMultiple() loads debugger in browser. using this workaround for right now
      playerDominoSprites.forEach((domino) =>
        playerDominoesGroup.children.entries.push(domino)
      );
      playerDominoesGroup.setXY(250, 550, 45);

      const opponentDominoSprites = this.getSprites(
        currentPlayerHands[this.currentGame.secondPlayer]
      );
      const opponentDominoesGroup = new Phaser.GameObjects.Group(scene);

      opponentDominoSprites.forEach((domino) => {
        opponentDominoesGroup.children.entries.push(domino);
      });
      opponentDominoesGroup.setXY(250, 40, 45);

      playerDominoesGroup.rotate(1.5708);
      opponentDominoesGroup.rotate(1.5708);
      // for dev testing
      scene.InteractivityHandler.setGroupInteractive(
        playerDominoesGroup.children.entries
      );
    };
    this.renderDominoPile = (x, y) => {
      const dominoPileSprites = this.getSprites(this.currentGame.dominoPile);

      // new domino group
      const dominoPileGroup = new Phaser.GameObjects.Group();
      // adding sprites to group
      dominoPileSprites.forEach((domino) =>
        dominoPileGroup.children.entries.push(domino)
      );
      // position dominoes
      dominoPileGroup.setXY(x, y, 0, 25);
      scene.dominoPileGroup = dominoPileGroup;
    };
    this.firstMove = () => {
      const getHighestDouble = (dominos) => {
        return dominos.reduce((domPoints, nextDom) => {
          if (nextDom.points % 2 === 0 && nextDom.left === nextDom.right) {
            if (domPoints < nextDom.points) {
              return nextDom.points;
            } else return domPoints;
          }
          return domPoints;
        }, 0);
      };

      const player = this.currentGame.firstPlayer;
      const opponent = this.currentGame.secondPlayer;

      const currentHands = this.currentGame.currentPlayerHands;
      const playerHand = currentHands[player];
      const opponentHand = currentHands[opponent];

      let playerHighestDouble = getHighestDouble(playerHand);
      let opponentHighestDouble = getHighestDouble(opponentHand);
      let highestDoubleSprite;
      if (playerHighestDouble > opponentHighestDouble) {
        highestDoubleSprite = this.getHighestDoubleSprite(
          playerHand,
          playerHighestDouble
        );
        this.currentGame.currentTurn = player;
      } else {
        highestDoubleSprite = this.getHighestDoubleSprite(
          opponentHand,
          opponentHighestDouble
        );
        this.currentGame.currentTurn = opponent;
      }
      console.log(highestDoubleSprite);
      // we have to get current turn
      // find double and remove from player Hand group
    };
    this.getHighestDoubleSprite = (playerhand, highestDouble) => {
      return playerhand.filter((domino) => {
        if (domino.points === highestDouble) {
          return domino.render(0, 0);
        }
      });
    };
    this.playDomino = (sprite, playerHandGroup = null) => {
      // remove domino from group
      console.log(sprite);
      // playerHandGroup.children.entries.filter(dominoSprite => {
      //   console.log(sprite)
      // })
      // return domino
    };
    this.renderDominoChain = (startingDomino) => {
      // startingDomino should be a sprite
      this.playDomino(startingDomino);
      const dominoChainGroup = new Phaser.GameObjects.Group(scene);
      dominoChainGroup.children.entries.push(startingDomino);
    };
    this.endGame = () => {
      this.currentGame = null;
    };
  }
}
