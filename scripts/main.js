import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";
import {JTetromino} from "./jTetro.js";
import {Position} from "./position.js"
import{Square} from "./square.js"
import {Collision} from "./collisions.js"

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
        this.positionOfJTetromino;
        this.collision = new Collision;
    }
    


    runOnce(){

        this.runKeyEvents();
        this.mouseEvent();
        this.jTetromino.changePlacement(new Position(3,0))
        this.jTetromino.changePlacement(new Position(3,0))


    

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
            this.jTetromino.changePlacement(this.jTetromino.group[0].currentSquare.position);
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
                console.log(this.collision.wallCollision(this.jTetromino.group,"right"))
                if (Settings.prototype.gameOn) this.jTetromino.moveXPosition(1);
            }
            if (action.key == "ArrowLeft"){
            
               // if (this.restrictMovement) return;
               // if (this.leftWallCollision(this.jTetromino)) return;

                if (Settings.prototype.gameOn) this.jTetromino.moveXPosition(-1);
            }
            if (action.key == "ArrowDown"){
               // if (this.restrictMovement) return;
               // if(this.bottomWallCollision(this.jTetromino)) return;
                if (Settings.prototype.gameOn) if (Settings.prototype.gameOn) this.jTetromino.moveYPosition(1);
            }
            if (action.key == "ArrowUp"){
                if (Settings.prototype.gameOn) {
                    this.bottomWallCollisionOn = false;
                   this.jTetromino.changePlacement(this.jTetromino.group[0].currentSquare.position);
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