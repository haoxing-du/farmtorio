import Phaser from 'phaser';

class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UIScene', active: true });

    this.inventory = {}
  }

  preload() {
    // load graphics
  }

  create() {
    let info = this.add.text(10, 10, 'Inventory:', { font: '28px', fill: '#000' });

    this.registry.events.on('changedata', (parent, key, data) => {
      if (key === 'inventory') {
        this.inventory = data;
        // To replace with a real inventory; with limited space
        info.setText('Inventory: ' + JSON.stringify(this.inventory));
      }
    }, this);
  }
}

export default UIScene;