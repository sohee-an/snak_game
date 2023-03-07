import { Actor } from "./actor";
import { ImageNames_AutoPreLoad } from "./game";
import { GameManager } from "./gameManager";

export class Food extends Actor{
    update(): void {
        //throw new Error("Method not implemented.");
        console.log("food updated");

        var playerPos = GameManager.instance.mainPlayer.getPosition();
        var myPosition = this.getPosition();
        var diff = playerPos.subtract(myPosition);
        if(diff.length() < 50)
        {

            console.log("player 와 food의 거리 : "+diff.length());
            this.image.setVisible(false);
        }
    }
    
    create(): void {
        this.initImage(ImageNames_AutoPreLoad.redDot);
        this.image.setScale(0.05, 0.05);
        this.setPosition(400, 300);
    }
    // player가 먹으면 플레이어를 강화시켜주는 "역활"
}