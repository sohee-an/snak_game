import { Actor } from "./actor";
import { ImageNames_AutoPreLoad } from "./game";
import { GameManager } from "./gameManager";

export class Food extends Actor {
  // 게임 도중에 플레이어에 의해 먹혔을 때 호출되는 재활용 함수
  reInit(): void {
    // 사과의 위치가 랜덤하게 변경됨,
    this.setPositionByVector(GameManager.instance.getRandomPositionByMapSize());
  }

  update(): void {
    //throw new Error("Method not implemented.");
    var playerPos = GameManager.instance.mainPlayer.getPosition();
    var myPosition = this.getPosition();
    var diff = playerPos.subtract(myPosition);
    if (diff.length() < 50) {
      // 플레이어가 사과를 먹었을 때
      // 사과를 꺼줌,
      this.reInit();
      GameManager.instance.mainPlayer.onEatFood(this);
    }
  }

  create(): void {
    this.initImage(ImageNames_AutoPreLoad.redDot);
    this.image.setScale(0.05, 0.05);
  }
  // player가 먹으면 플레이어를 강화시켜주는 "역활"
}
