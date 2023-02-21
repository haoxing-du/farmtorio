import Phaser from 'phaser';

class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UIScene', active: true });

    this.score = 0;
  }

  create () {
    let info = this.add.text(10, 10, 'Score: 0', { font: '32px', fill: '#000' });

    let game = this.scene.get('StartScene');

    game.events.on('incrementScore', () => {

      this.score += 10;

      info.setText('Score: ' + this.score);

    }, this);
  }
}

export default UIScene;