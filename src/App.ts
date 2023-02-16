import Phaser from 'phaser';
import StartScene from './StartScene';

const config = {
  // Configure Phaser graphics settings
  type: Phaser.AUTO,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1000,
    height: 800,
  },

  // Configure physics settings
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  }
};

const game = new Phaser.Game(config);

game.scene.add('StartScene', StartScene);
game.scene.start('StartScene');
