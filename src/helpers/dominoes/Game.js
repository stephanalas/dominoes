export default class Game {
  constructor(gameConfig) {
    this.gameType = gameConfig.gameType;
    this.totalPlayers = gameConfig.totalPlayers;
    this.currentTurn = null;
    this.hasEnded = false;
    this.winner = null;
    this.loser = null;
    this.firstPlayer = null;
    this.secondPlayer = null;
    this.currentPlayerHands = {};
    this.dominoPile = [];
    // linked list VVVVVV
    this.dominoChain = null;
  }
}
