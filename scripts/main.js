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
        this.jTetromino.createTetromino();
        this.runKeyEvents();
        this.mouseEvent();
    

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
        window.addEventListener("mousemove",action => {
            console.log(action.clientX, "mouse client x")
        })

        window.addEventListener("touchmove",action => {
   
            if (!allowtoMove) return;
       
     
            let touchEvent = action.changedTouches[0];

            console.log(touchEvent.clientX, "client x touch event")
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
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(25);
            }
            if (action.key == "ArrowLeft"){
                if(Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(-25)
            }
            if (action.key == "ArrowDown"){
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addY(25)
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