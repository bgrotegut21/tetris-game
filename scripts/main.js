import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";
import {JTetromino} from "./jTetro.js";
import {Position} from "./position.js"

class Game {
    constructor(){
        this.attribute = new Attribute;
        this.jTetrominoPosition = new Position(75,0)
        this.jTetromino = new JTetromino(this.jTetrominoPosition);
        this.tetroMove = false
    }
    


    runOnce(){
        this.jTetromino.createTetromino()
        this.runKeyEvents()
        this.runMouseEvents()
    

    }


    runKeyEvents(){
        window.addEventListener("keydown", action => {
            if (action.key == "ArrowRight") {
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(25);
            }
            if (action.key == "ArrowLeft"){
                if(Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(-25)
            }
            if (action.key == "ArrowDown"){
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addY(25)
            }


            if (action.key == "q") {
                console.log("quit")s
                Settings.prototype.gameOn = false;
                startTimer();
            }
            if(action.key == "p") {
                Settings.prototype.gameOn = true
                startTimer();
            }
            action.preventDefault();
        })
    }
    

    runGame(){

        this.jTetromino.changePosition(this.jTetrominoPosition)
        
    }
}

let game = new Game;

game.runOnce()
function startTimer(){
    let timer = setInterval(function(){
        if(!Settings.prototype.gameOn) clearInterval(timer);
  
        game.runGame()
    },10)
}