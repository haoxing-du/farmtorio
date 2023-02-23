import Phaser from 'phaser';

class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UIScene', active: true });

    this.inventory = {}
  }

  preload() {
    // load graphics
  }

  create () {
    let info = this.add.text(10, 10, 'Inventory:', { font: '32px', fill: '#000' });

    let game = this.scene.get('StartScene');

    game.events.on('addItem', (item) => {
      
      if (item in this.inventory) {
        this.inventory[item] += 1;
      } else{
        this.inventory[item] = 1;
      }

      // set text to reflect inventory
      info.setText('Inventory: ' + JSON.stringify(this.inventory));

    }, this);
  }
}

export default UIScene;