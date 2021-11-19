import Game from './dominoes/Game';
export default class GameHandler {
  constructor(scene) {
    this.currentGame = null;
    this.createGame = (type, players) => {
      if (this.currentGame) {
        this.currentGame = null;
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
      this.renderDominoPile(40, 50);
      //
      this.firstMove();
      // have player's name to determine which hand to give dominoes

      // deal shuffled dominoes
      // making sure that player dominoes is reveal and bot dominoes aren't
      // bot automatically playes double six if not current turn is player and wait for draggable input sprite to hit zone
      // if no double six try double 5 etc
      // place dominoes in dropzone
    };

    this.renderPlayersHands = () => {
      const { currentPlayerHands } = this.currentGame;

      // groups sprite from player hand and adds it to scene
      const playerDominoes = currentPlayerHands[this.currentGame.firstPlayer];
      scene.playerDominoesGroup = scene.add.group();
      for (let dom of playerDominoes) {
        scene.playerDominoesGroup
          .create(0, 0, dom.sprite, dom.frame)
          .setData({ ...dom });
      }

      scene.playerDominoesGroup.setXY(250, 550, 45);
      scene.playerDominoesGroup.scaleXY(2, 2);

      scene.playerDominoesGroup.rotate(1.5708);

      // using Phaser group.addMultiple() loads debugger in browser. using this workaround for right now
      // this.addSpritesToGroup(playerDominoS, scene.playerDominoesGroup);

      const opponentDominoes =
        currentPlayerHands[this.currentGame.secondPlayer];
      scene.opponentDominoesGroup = scene.add.group();
      for (let dom of opponentDominoes) {
        scene.opponentDominoesGroup
          .create(0, 0, dom.sprite, dom.frame)
          .setData({ ...dom });
      }

      scene.opponentDominoesGroup.setXY(250, 50, 45);
      scene.opponentDominoesGroup.scaleXY(2, 2);
      scene.opponentDominoesGroup.rotate(1.5708);
      // for dev testing
      // scene.InteractivityHandler.setGroupInteractive(
      //   scene.playerDominoesGroup.children.entries
      // );
    };

    this.renderDominoPile = (x, y) => {
      const { dominoPile } = this.currentGame;

      // new domino group
      scene.dominoPileGroup = scene.add.group();
      // adding sprites to group
      for (let dom of dominoPile) {
        scene.dominoPileGroup.create(0, 0, dom.sprite, dom.frame).setData({
          ...dom,
        });
      }
      // position dominoes
      scene.dominoPileGroup.setXY(x, y, 0, 38);
      scene.dominoPileGroup.scaleXY(2, 2);
    };
    this.firstMove = () => {
      const player = this.currentGame.firstPlayer;
      const opponent = this.currentGame.secondPlayer;

      let playerHighestDouble = this.getHighestDouble(
        scene.playerDominoesGroup
      );
      let opponentHighestDouble = this.getHighestDouble(
        scene.opponentDominoesGroup
      );
      console.log(playerHighestDouble, opponentHighestDouble);
      // we have to get current turn
      // find double and remove from player Hand group
      if (
        playerHighestDouble.data.list.points >
        opponentHighestDouble.data.list.points
      )
        this.currentGame.currentTurn = player;
      else this.currentGame.currentTurn = opponent;

      scene.dominoChainGroup = scene.add.group();

      scene.dominoChainGroup.setXY(400, 300);
      if (this.currentGame.currentTurn === player) {
        scene.playerDominoesGroup.remove(playerHighestDouble);
        scene.dominoChainGroup.add(playerHighestDouble);
      } else {
        scene.opponentDominoesGroup.remove(opponentHighestDouble);
        scene.dominoChainGroup.add(opponentHighestDouble);
      }
      console.log(scene.dominoChainGroup);
      console.log(scene.playerDominoesGroup);
      console.log(scene.opponentDominoesGroup);
    };

    this.playDomino = (sprite, player) => {
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
  }
  addSpritesToGroup(sprites, group) {
    sprites.forEach((sprite) => {
      group.children.entries.push(sprite);
    });
  }
  removeSpriteFromGroup(frame, group) {
    let spriteIdx;
    group.children.entries.forEach(child, (idx) => {
      if (child.frame === frame) spriteIdx = idx;
    });
    return group.splice(spriteIdx, 1)[0];
  }
  // getSprites(dominos) {
  //   return dominos.map((domino) =>
  //     !domino.points ? domino.render(0, 0, 'blanks') : domino.render(0, 0)
  //   );
  // }
  getHighestDouble(dominoGroup) {
    let highestDouble;
    dominoGroup.getChildren().forEach((domino) => {
      if (domino.data.list.isDouble) {
        if (!highestDouble) highestDouble = domino;
        else
          highestDouble.data.list.points > domino.data.list.points
            ? null
            : (highestDouble = domino);
      }
    });
    return highestDouble;
  }
}
