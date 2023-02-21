import Phaser from 'phaser';
import StartScene from './StartScene';
import UIScene from './UIScene'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: true,
      }
  },
};

var game = new Phaser.Game(config);

game.scene.add('StartScene', StartScene);
game.scene.add('UIScene', UIScene);
game.scene.start('StartScene');