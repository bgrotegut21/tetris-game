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

        this.runKeyEvents();
        this.mouseEvent();
        this.jTetromino.changePlacement();
        this.jTetromino.changePlacement();
    

    }

    leftWallCollision(){
        console.log(Settings.)
        console.log(Settings.prototype.collisionWidth, "collision width")
        if (this.jTetrominoPosition.xPosition <= Settings.prototype.leftCollisionWidth ){
            return true;
        } else {
            return false;
        }
    }

    rightWallCollision(){
        if (this.jTetrominoPosition.xPosition >= Settings.prototype.gridWidth ){
            return true;
        } else {
            return false;
        }
    }



    mouseEvent (){
        
        let allowtoMove = false;
        let recordedPosition;
        let yRecordedPosition;
        window.addEventListener("touchstart", action => {
            if (!Settings.prototype.gameOn) return;
            let touchEvent= action.changedTouches[0];
            recordedPosition = Math.floor(touchEvent.clientX);
            yRecordedPosition = Math.floor(touchEvent.clientY);

            allowtoMove = true
        });
        window.addEventListener("click",() => {
            if(!Settings.prototype.gameOn) return;
            this.jTetromino.changePlacement();
        })
        window.addEventListener("touchmove",action => {
   
            if (!allowtoMove) return;
            this.jTetromino.stopMovement = false
            let touchEvent = action.changedTouches[0];
            if (Math.floor(touchEvent.clientX) >recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){
                this.jTetrominoPosition = this.jTetrominoPosition.addX(25);
                recordedPosition = Math.floor(touchEvent.clientX);
            }

            if (Math.floor(touchEvent.clientX) < recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){
                this.jTetrominoPosition = this.jTetrominoPosition.addX(-25);
                recordedPosition = Math.floor(touchEvent.clientX);
            }
            if (Math.floor(touchEvent.clientY) > yRecordedPosition && (Math.floor(touchEvent.clientY) - yRecordedPosition) %10 == 0 ){
                this.jTetrominoPosition = this.jTetrominoPosition.addY(25)
                yRecordedPosition = Math.floor(touchEvent.clientY);
            }
    
         


        },{passive:true});
        window.addEventListener("touchend", () => {
      
            allowtoMove = false;
        })
      
        
    }


    runKeyEvents(){
        window.addEventListener("keydown", action => {
            if (action.key == "ArrowRight") {
                if (this.rightWallCollision()) return;
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(25);
            }
            if (action.key == "ArrowLeft"){
                console.log("left arrow")
                if (this.leftWallCollision()) return;
                if(Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(-25)
            }
            if (action.key == "ArrowDown"){
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addY(25)
            }
            if (action.key == "ArrowUp"){
                if (this.wallCollision()) return;
                if (Settings.prototype.gameOn) this.jTetromino.changePlacement();
            }

            if (action.key == "q") {
                console.log("quit")
                Settings.prototype.gameOn = false;
                startTimer();
            }
            if(action.key == "p") {
                Settings.prototype.gameOn = true
                startTimer();
            }
            action.preventDefault();
        })
        window.addEventListener("keyup", action => {
            if (action.key == "ArrowUp"){
                this.jTetromino.stopMovement = false;
            }
            action.preventDefault();
        })
    }
    

    runGame(){

        if (!this.jTetromino.stopMovement) this.jTetromino.changePosition(this.jTetrominoPosition)
        
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