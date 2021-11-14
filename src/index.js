import Phaser from 'phaser';
import Game from './scenes/game.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  backgroundColor: '#4E6A54',
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
  scene: [Game],
};

const game = new Phaser.Game(config);
