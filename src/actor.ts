import { ImageNames_AutoPreLoad } from "./game";
import { GameManager } from "./gameManager";

export abstract class Actor {
  // 화면상에 존재하는 것
  image: Phaser.GameObjects.Image;
  angle: number = 0;
  direction: Phaser.Math.Vector2 = new Phaser.Math.Vector2(1, 0);

  // abstracts
  abstract create(): void;
  abstract update(): void;
  preUpdate() {
    if (this.image != null) this.image.angle = this.angle;
  }

  constructor() {
    GameManager.instance.addActor(this);
  }

  // 방향을 회전 시키는
  rotateVector(vector: Phaser.Math.Vector2, degrees: number) {
    const radians = Phaser.Math.DegToRad(degrees);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const x = vector.x * cos - vector.y * sin;
    const y = vector.x * sin + vector.y * cos;
    return new Phaser.Math.Vector2(x, y);
  }

  // 이동
  move(addVector: Phaser.Math.Vector2) {
    this.image.x += addVector.x;
    this.image.y += addVector.y;
  }

  setPosition(x: number, y: number) {
    this.image.x = x;
    this.image.y = y;
  }

  setPositionByVector(pos: Phaser.Math.Vector2) {
    this.image.x = pos.x;
    this.image.y = pos.y;
  }

  getPosition(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.image.x, this.image.y);
  }

  initImage(imageName: ImageNames_AutoPreLoad): Phaser.GameObjects.Image {
    this.image = GameManager.currentScene.add.image(1200, 700, imageName);
    return this.image;
  }
}
