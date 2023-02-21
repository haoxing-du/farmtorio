import Phaser from 'phaser';
import StartScene from './StartScene';
import GUIScene from './gui'

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
game.scene.add('GUIScene', GUIScene);
game.scene.start('StartScene');