import { Vector } from "matter";
import { Actor } from "./actor";
import { Food } from "./food";
import { ImageNames_AutoPreLoad } from "./game";
import { GameManager } from "./gameManager";
import { PlayerBody } from "./playerBody";

// 플레이어는 무엇인가?
export class Player extends Actor {
  myBodys: Array<PlayerBody> = new Array<PlayerBody>();

  onEatFood(food: Food) {
    // 플레이어가 먹은 food
    // 필요한 정보가 다 있음.
    const playerBody = GameManager.instance.createActor(PlayerBody);
    this.myBodys.push(playerBody);

    playerBody.Init(this, this.myBodys.length);
  }

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

  update() {
    // 방향키 입력 처리
    // 앞으로 플레이어는 계속 이동해야 함
    // 방향은 어떻게 구현할까?
    this.move(this.direction);
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
  }
}
