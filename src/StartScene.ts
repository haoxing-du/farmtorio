import Phaser from 'phaser';

class StartScene extends Phaser.Scene {
  loadingText?: Phaser.GameObjects.Text;

  init() {
    this.loadingText = this.add.text(
      500,
      400,
      'Loading ...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    );
    this.loadingText.setOrigin(0.5, 0.5);
  }

  preload() {
    this.load.image('example', 'assets/example.png');
  }

  create() {
    // Remove loading text
    this.loadingText!.destroy();

    // Add background image
    const startScreen = this.add.image(500, 400, 'StartScreen');
    startScreen.setScale(500, 400);

    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)
  }

  keyReleased() {
    console.log('Key released');
  }
}

export default StartScene;
