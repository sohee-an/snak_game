import { Actor } from "./actor";
import { ImageNames_AutoPreLoad } from "./game";
import { Player } from "./player";

export class GameManager {
  mapSizeX: number = 1280;
  mapSizeY: number = 720;

  // 싱글톤 패턴이라고 함,
  static instance: GameManager;
  static init() {
    GameManager.instance = new GameManager();
  }

  // statics
  static currentScene: Phaser.Scene;
  static loadImage(imageName: ImageNames_AutoPreLoad) {
    GameManager.currentScene.load.image(imageName, `assets/${imageName}.png`);
  }

  static loadImageFromString(imageName: string) {
    GameManager.currentScene.load.image(imageName, `assets/${imageName}.png`);
  }

  // 코드를 절대로 한자라도, 한줄이라도, 한 글자라도 적게 쓴다.
  // 유지보수, 생산성, 구조 떄문에
  actors: Array<Actor> = new Array<Actor>();
  mainPlayer: Player;

  update() {
    this.actors.forEach((_actor) => {
      _actor.preUpdate();
    });

    this.actors.forEach((_actor) => {
      _actor.update();
    });
  }

  addActor(actor: Actor) {
    actor.create();
    this.actors.push(actor);
  }

  createActor<T>(constructor: new () => T): T {
    return new constructor();
  }

  getRandomPositionByMapSize(): Phaser.Math.Vector2 {
    const randomIntX = Math.floor(Math.random() * this.mapSizeX);
    const randomIntY = Math.floor(Math.random() * this.mapSizeY);

    return new Phaser.Math.Vector2(randomIntX, randomIntY);
  }
}
