import { Vector } from "matter";
import { Actor } from "./actor";
import { Food } from "./food";
import { ImageNames_AutoPreLoad } from "./game";
import { GameManager } from "./gameManager";
import { PlayerBody } from "./playerBody";

// 플레이어는 무엇인가?
export class Player extends Actor {
  // 이동가능하다.
  // 아이템을 먹으면 꼬리가 늘어난다.

  // 다른 유저랑 부딛히면 죽는다.
  // 자기 몸이 부딛히면 죽는다.

  // 쉬운것 부터 하는게 정석임

  //-------
  //이동의 특징
  // 멈추지 않는다.
  // 왼쪽 방향을 누루면, 플레어의 머리가 왼쪽으로 회전한다.
  // 오른쪽을 누루면 머리가 오른쪽으로 회전한다.
  // 플레이어는 머리방향으로 직진 이동을 계속한다.

  // 시작할 때 오른쪽을 먼저 보고 있다.
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  playerSpeed: integer = 5;
  myBodys: Array<PlayerBody> = new Array<PlayerBody>();

  onEatFood(food: Food) {
    // 플레이어가 먹은 food
    // 필요한 정보가 다 있음.
    const playerBody = GameManager.instance.createActor(PlayerBody);
    this.myBodys.push(playerBody);
    let length = this.myBodys.length - 1;
    let lastActor: Actor = this;
    if (length > 0) {
      lastActor = this.myBodys[length - 1];
    }

    playerBody.Init(lastActor, this.myBodys.length);
  }

  create() {
    // 플레이어는 게임매니저를 통해서, 이미지와 입력을 얻어옴.
    this.cursors = GameManager.currentScene.input.keyboard.createCursorKeys();
    this.image = GameManager.currentScene.add.image(
      1200,
      700,
      ImageNames_AutoPreLoad.playerFace
    );
    this.image.setScale(0.1, 0.1);
    this.setPosition(600, 300);
  }

  reach(
    head: Phaser.Math.Vector2,
    tail: Phaser.Math.Vector2,
    tgt: Phaser.Math.Vector2
  ) {
    // returns new head and tail in the format of:
    //   [new_head, new_tail]
    // where `new_head` has been moved to `tgt`

    // calculate the current length
    // (in practice, this should be calculated once and saved,
    //  not re-calculated every time `reach` is called)
    var c_dx = tail.x - head.x;
    var c_dy = tail.y - head.y;
    var c_dist = Math.sqrt(c_dx * c_dx + c_dy * c_dy);

    // calculate the stretched length
    var s_dx = tail.x - tgt.x;
    var s_dy = tail.y - tgt.y;
    var s_dist = Math.sqrt(s_dx * s_dx + s_dy * s_dy);

    // calculate how much to scale the stretched line
    var scale = c_dist / s_dist;

    // return the result
    return { x: tgt.x + s_dx * scale, y: tgt.y + s_dy * scale };
  }

  update() {
    // Player의 이동하기 전 시점의 위치가 필요,
    let headPosition = this.getPosition();

    // 방향키 입력 처리
    // 앞으로 플레이어는 계속 이동해야 함
    // 방향은 어떻게 구현할까?
    this.move(this.direction);

    // move하고 난 다음의 tgt 포지션
    let tgtPosition = this.getPosition();

    if (this.cursors.left.isDown) {
      // 왼쪽 방향키를 눌렀을 때 처리
      this.direction = this.rotateVector(this.direction, -5);
      this.angle -= 5;
    }

    if (this.cursors.right.isDown) {
      // 오른쪽 방향키를 눌렀을 때 처리
      this.direction = this.rotateVector(this.direction, 5);
      this.angle += 5;
    }

    // 감각적 야매 방법, isDown이 갱신이 안되길래, 바꿔버림.
    this.cursors.left.isDown = false;
    this.cursors.right.isDown = false;
    this.cursors.up.isDown = false;
    this.cursors.down.isDown = false;

    // move update all playerBody
    for (let i = 0; i < this.myBodys.length; i++) {
      // head, tail, tgt
      //tgt는 새로운 이동 지점
      // tail은 myBodys[i]번째의 위치가 tail이다.
      let tailPosition = this.myBodys[i].getPosition();
      let newTailPosition = this.reach(headPosition, tailPosition, tgtPosition);
      this.myBodys[i].setPosition(newTailPosition.x, newTailPosition.y);

      // 다음 index에서 사용할 tgt와 headposition을 갱신함.
      // headposition을 현재 tail 기준으로 바꿔줘야함.
      headPosition = tailPosition;

      // 작업 끝나고 tgtPosition 갱신해서 다음 for문에서 사용될 수 있도록 하자.
      tgtPosition.x = newTailPosition.x;
      tgtPosition.y = newTailPosition.y;
    }
  }
}
