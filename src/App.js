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
  width: 400,
  height: 300,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: true,
      }
  },
};

var game = new Phaser.Game(config);

const ONE_COMPONENT = 160;
const TWO_COMPONENTS = 113.13;

class StartScene extends Phaser.Scene {

  platforms;
  player;
  cursors;
  stars;
  score;
  scoreText;

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
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    this.add.image(0, 0, 'sky').setOrigin(0).setScrollFactor(1);

    // create platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // create character
    this.player = this.physics.add.sprite(16, 16, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // create character animations
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

    // uncomment if 2D game
    // this.player.body.setGravityY(300);

    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {x: 12, y: 0, stepX: 70, stepY: 40}
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);

    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // scoring
    this.score = 0;
    this.scoreText = this.add.text(15, 15, 'score: 0', {fontSize: '32px', fill: '#000'});
    this.scoreText.setScrollFactor(0);

    this.cameras.main.startFollow(this.player, true);
    // this.cameras.main.setZoom(2);
  }

  update() {
    let vx = ONE_COMPONENT;
    let vy = ONE_COMPONENT;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-vx);
      this.player.anims.play('left', true);
      vy = TWO_COMPONENTS;
    } else if (this.cursors?.right.isDown) {
      this.player.setVelocityX(vx);
      this.player.anims.play('right', true);
      vy = TWO_COMPONENTS;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
      vy = ONE_COMPONENT
    }

    if (this.cursors?.up.isDown) {
      this.player?.setVelocityY(-vy);
      vx = TWO_COMPONENTS;
    } else if (this.cursors?.down.isDown) {
      this.player?.setVelocityY(vy);
      vx = TWO_COMPONENTS;
    } else {
      this.player?.setVelocityY(0);
      vx = ONE_COMPONENT;
    }

    // this.scoreText.setXY(this.cameras.main.centerX + 16, this.cameras.main.y + 16)

    // if (this.cursors?.up.isDown && this.player?.body.touching.down) {
    //   this.player?.setVelocityY(-330);
    // }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText?.setText('score: ' + this.score);
  }
  
}

game.scene.add('StartScene', StartScene);
game.scene.start('StartScene');