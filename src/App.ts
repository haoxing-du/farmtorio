import Phaser from 'phaser';
// import StartScene from './StartScene';

// const config = {
//   // Configure Phaser graphics settings
//   type: Phaser.AUTO,
//   scale: {
//     parent: 'game',
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
//     width: 1000,
//     height: 800,
//   },

//   // Configure physics settings
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 200 },
//       debug: true,
//     },
//   }
// };

// const game = new Phaser.Game(config);

// game.scene.add('StartScene', StartScene);
// game.scene.start('StartScene');


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

const ONE_COMPONENT: number = 160;
const TWO_COMPONENTS: number = 113.13;

class StartScene extends Phaser.Scene {

  platforms?: Phaser.Physics.Arcade.StaticGroup;
  player?: Phaser.Physics.Arcade.Sprite;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet(
      'dude', 
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 },
    );
  }

  
  create() {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [ {key: 'dude', frame: 4}],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1,
    })

    // this.player.body.setGravityY(300);

    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    // this.add.image(400, 300, 'star');

    // var particles = this.add.particles('star');

    // var emitter = particles.createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD'
    // });

    // var logo = this.physics.add.image(400, 100, 'bomb');

    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);

    // emitter.startFollow(logo);
  }

  update(time: number, delta: number): void {
    let vx: number = ONE_COMPONENT;
    let vy: number = ONE_COMPONENT;

    if (this.cursors?.left.isDown) {
      this.player?.setVelocityX(-vx);
      this.player?.anims.play('left', true);
      vy = TWO_COMPONENTS;
    } else if (this.cursors?.right.isDown) {
      this.player?.setVelocityX(vx);
      this.player?.anims.play('right', true);
      vy = TWO_COMPONENTS;
    } else {
      this.player?.setVelocityX(0);
      this.player?.anims.play('turn');
      vy = ONE_COMPONENT
    }

    if (this.cursors?.up.isDown) {
      this.player?.setVelocityY(-vy);
      this.player?.anims.play('turn', true);
      vx = TWO_COMPONENTS;
    } else if (this.cursors?.down.isDown) {
      this.player?.setVelocityY(vy);
      this.player?.anims.play('turn', true);
      vx = TWO_COMPONENTS;
    } else {
      this.player?.setVelocityY(0);
      this.player?.anims.play('turn');
      vx = ONE_COMPONENT;
    }

    // if (this.cursors?.up.isDown && this.player?.body.touching.down) {
    //   this.player?.setVelocityY(-330);
    // }
  }


  
}

game.scene.add('StartScene', StartScene);
game.scene.start('StartScene');