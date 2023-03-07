import { Actor } from "./actor";
import { ImageNames_AutoPreLoad } from "./game";
import { Player } from "./player";

export class GameManager {
  // 싱글톤 패턴
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

  actors: Array<Actor> = new Array<Actor>(); //화면에 나와있는 애들
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
}
