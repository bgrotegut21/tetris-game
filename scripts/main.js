import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";
import {JTetromino} from "./jTetro.js";
import {Position} from "./position.js"

let gameOn = true

class Game {
    constructor(){
        this.attribute = new Attribute;
        this.settings = new Settings;
        this.jTetromino = new JTetromino(new Position(75,25));


    }
    runOnce(){
        console.log("this will run once")
        this.jTetromino.createTetromino()
        this.runKeyEvents()

    }
    runKeyEvents(){
        console.log("random key event")
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