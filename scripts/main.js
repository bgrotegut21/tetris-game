import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";

let gameOn = true

class Game {
    constructor(){
        this.attribute = new Attribute;
        this.settings = new Settings;


    }
    runOnce(){
        console.log("this will run once")
    }

    runGame(){
        gameOn = false;
        console.log("will run game until the player quits or pauses");
    }
}

let game = new Game;


game.runOnce()
while (gameOn){
    game.runGame();
}