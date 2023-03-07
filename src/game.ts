import "phaser";
import { Food } from "./food";
import { GameManager } from "./gameManager";
import { Player } from "./player";

// 이미지를 추가하는 방법,
// png 이미지를 assets에 추가하고, ImageNames에 동일 이름으로 정의
export enum ImageNames_AutoPreLoad {
  backGroundTile = "backGroundTile",
  playerFace = "playerFace",
  food = "food",
  redDot = "redDot",
}

export default class MainScene extends Phaser.Scene {
  character: Phaser.GameObjects.Sprite;
  constructor() {
    super("demo");
    //이미지 로드 기능을 쓰려면, MainScene을 사용해야 되.
    GameManager.currentScene = this;
    GameManager.init();
  }

  preload() {
    // 기존로드방식은, 리소스의 위치를 매번 적어줘야함.
    for (const key in ImageNames_AutoPreLoad) {
      GameManager.loadImageFromString(key);
    }

    //this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image("libs", "assets/libs.png");
    this.load.glsl("bundle", "assets/plasma-bundle.glsl.js");
    this.load.glsl("stars", "assets/starfields.glsl.js");
  }

  create() {
    this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);
    this.add.shader("Plasma", 0, 412, 800, 172).setOrigin(0);
    this.add.image(400, 300, "libs");

    //const logo = this.add.image(400, 70, 'logo');
    const backGroundTile = this.add.image(400, 70, "backGroundTile");

    // factory patern
    var player = GameManager.instance.createActor(Player);
    GameManager.instance.mainPlayer = player;
    GameManager.instance.createActor(Food);
  }

  playerSpeed: integer = 3;
  update(time: number, delta: number): void {
    GameManager.instance.update();
  }

  // 그려라 는 신경쓰지 않아도 됨,
  // 알아서 매 프레임 그림
  // 즉 update에서 매 프레임마다 갱신해줘야함.
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

// const config = {
//     type: Phaser.AUTO,
//     backgroundColor: '#125555',
//     width: 1280,
//     height: 720,
//     scene: MainScene
// };

const game = new Phaser.Game(config);
