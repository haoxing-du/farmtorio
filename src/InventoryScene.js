import Phaser from 'phaser';

class InventoryScene extends Phaser.Scene {
  constructor () {
    super({ key: 'InventoryScene', active: true });

    this.inventory = {}
  }

  preload() {
    // load graphics
  }

  create () {
    this.inventory = this.registry.get('inventory');
    // To replace with a real inventory
    this.info = this.add.text(10, 300, 'This is the full inventory: ' + JSON.stringify(this.inventory), { font: '28px', fill: '#000' });
    // Note: currently the inventory is not updated when you pick up an item
    // You need to go back to the StartScene to see the updated inventory
    // But maybe I want to forbid picking up items while inventory is open?
  }
}

export default InventoryScene;