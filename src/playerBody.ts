import { Actor } from "./actor";
import { ImageNames_AutoPreLoad } from "./game";
import { GameManager } from "./gameManager";
import { Player } from "./player";

// player의 뒤에 붙어 있음.
export class PlayerBody extends Actor {
  // 자기가 쫓을 상대가 있음.
  followTarget: Actor;
  indexNumber: number = 0;

  Init(inArg: Actor, inIndexNumber: number) {
    this.followTarget = inArg;
    this.indexNumber = inIndexNumber;

    // player의 바로 뒤쪽에 해당 개체를 붙인다.
    let tempDirection = new Phaser.Math.Vector2(
      this.followTarget.direction.x,
      this.followTarget.direction.y
    );
    let backPosition = this.followTarget
      .getPosition()
      .subtract(tempDirection.scale(35));
    this.setPositionByVector(backPosition);
  }

  create(): void {
    this.initImage(ImageNames_AutoPreLoad.playerBody);
    this.image.setScale(0.06, 0.06);
  }

  update(): void {
    return;

    if (this.followTarget == null) {
      return;
    }

    let tempDirection = new Phaser.Math.Vector2(
      this.followTarget.direction.x,
      this.followTarget.direction.y
    );
    let backPosition = this.followTarget
      .getPosition()
      .subtract(tempDirection.scale(100 * this.indexNumber));
    this.setPositionByVector(backPosition);
  }
}
