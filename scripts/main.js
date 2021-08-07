import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";
import {JTetromino} from "./jTetro.js";
import {Position} from "./position.js"
import{Square} from "./square.js"

class Game {
    constructor(){
        this.attribute = new Attribute;
        this.jTetrominoPosition = new Position(75,0)
        this.jTetromino = new JTetromino(this.jTetrominoPosition);
        this.tetroMove = false
        this.settings = new Settings;
        this.restrictMovement = false;
        this.collisionPoints = []
        this.bottomWallCollisionOn = true
    }
    


    runOnce(){

        this.runKeyEvents();
        this.mouseEvent();
        this.jTetromino.changeDefaultPosition(new Position(3,0))
        this.jTetromino.moveXPosition(1)
        this.jTetromino.moveXPosition(3)


    

    }

    leftWallCollision(){
        if (this.jTetrominoPosition.xPosition <= this.settings.collisionWidth){
            return true;
        } else {
            return false;
        }
    }

    rightWallCollision(tetro){
        let width ;
        if(tetro.currentPosition == 1) width = tetro.gridWidth;
        if(tetro.currentPosition == 2) width = tetro.gridWidth2;

        if (this.jTetrominoPosition.xPosition >= width){
            return true;
        } else {
            return false;
        }
    }

    bottomWallCollision(tetro) {

        let height;
        if(tetro.currentPosition == 1) height = tetro.gridHeight;
        if(tetro.currentPosition == 2) height = tetro.gridHeight2;
     
        if (tetro.position.yPosition >= height){
            this.addToGrid(tetro);
            return true;
        } else {

            return false;
        }

    }

    addToGrid(tetro){
       // tetro.changePlacement()
     //   tetro.group.map(currentTetroObject=> {
    
          //  currentTetroObject.playable = false;
        //    this.collisionPoints.push(currentTetroObject);
      //  })

       // tetro.group = []

        //this.jTetrominoPosition = new Position (75,0);
      //  tetro.changePosition(this.jTetrominoPosition)
       // tetro.changePlacement();
       // tetro.changePlacement();
       console.log("WIP")
     
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
    squareCollision(tetrogroup){
        for (let squareObject of this.collisionPoints){


        }

    }

    runKeyEvents(){
        window.addEventListener("keydown", action => {
            if (action.key == "ArrowRight") {
                if (this.restrictMovement) return;
                if (this.rightWallCollision(this.jTetromino)) return;
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(25);
            }
            if (action.key == "ArrowLeft"){
            
                if (this.restrictMovement) return;
                if (this.leftWallCollision(this.jTetromino)) return;
                if(Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addX(-25)
            }
            if (action.key == "ArrowDown"){
                if (this.restrictMovement) return;
                if(this.bottomWallCollision(this.jTetromino)) return;
                if (Settings.prototype.gameOn) this.jTetrominoPosition = this.jTetrominoPosition.addY(25)
            }
            if (action.key == "ArrowUp"){
                if (Settings.prototype.gameOn) {
                    this.bottomWallCollisionOn = false;
                   // this.jTetromino.changePlacement();
                    this.bottomWallCollisionOn = true;
                }
            }

            if (action.key == "q") {

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
        this.squareCollision(this.jTetromino.group)
        this.bottomWallCollision(this.jTetromino)
        this.jTetromino.moveXPosition()
        
    }
}

let game = new Game;

game.runOnce()
function startTimer(){
    let timer = setInterval(()=>{
        if(!Settings.prototype.gameOn) clearInterval(timer);
  
        game.runGame()
    },10)
}