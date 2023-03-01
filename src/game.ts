import "phaser";

enum ImageNames {
  backGroundFile = "backGroundFile",
  playerFace = "playerFace",
}

class GameManger {
  //statics
  static currentScene: Phaser.Scene;

  // IMAGEload
  static loadImage(imageName: ImageNames) {
    GameManger.currentScene.load.image(imageName, `assets/${imageName}.png`);
  }
}

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("demo");
    GameManger.currentScene = this;
  }

  preload() {
    GameManger.loadImage(ImageNames.backGroundFile);
    GameManger.loadImage(ImageNames.playerFace);

    this.load.image("logo", "assets/phaser3-logo.png");
    this.load.image("libs", "assets/libs.png");
    this.load.glsl("bundle", "assets/plasma-bundle.glsl.js");
    this.load.glsl("stars", "assets/starfields.glsl.js");
  }

  create() {
    this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

    this.add.shader("Plasma", 0, 412, 800, 172).setOrigin(0);

    this.add.image(400, 300, "libs");

    const backGroundFile = this.add.image(400, 70, "backGroundFile");
    const playerFace = this.add.image(640, 360, ImageNames.playerFace);
    playerFace.setScale(0.1, 0.1);

    var input = this.input;
    //
    var key;
  }

  update(time: number, delta: number): void {
    // let cursors=this.input.keyboard.createCursorKeys()
    // if(cursors.up.isDown){
    //     this.playerFace.y+=1;
    // }
    // if (cursors.up.isDown) {
    //   this.playerFace.y += 1;
    // }
    // if (cursors.up.isDown) {
    //   this.playerFace.y += 1;
    // }
    // if (cursors.up.isDown) {
    //   this.playerFace.y += 1;
    // }
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 1280,
  height: 720,
  scene: MainScene,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
