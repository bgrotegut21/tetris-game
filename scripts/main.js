import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";
import {JTetromino} from "./jTetro.js";
import {Position} from "./position.js"
import{Square} from "./square.js"
import {Collision} from "./collisions.js"

class Game {
    constructor(){
        this.attribute = new Attribute;
        this.jTetromino = new JTetromino;
        this.tetroMove = false
        this.settings = new Settings;
        this.restrictMovement = false;
        this.collisionPoints = []
        this.bottomWallCollisionOn = true
        this.positionOfJTetromino;
        this.collision = new Collision;
        this.restrictMovement = false;
        
    }
    


    runOnce(){

        this.runKeyEvents();
        this.mouseEvent();
        this.jTetromino.changePlacement(new Position(3,0))
        this.jTetromino.changePlacement(new Position(3,0))


    

    }


    addToGrid(tetro){
        
        tetro.group.map(tetroObject => console.log(tetroObject.currentSquare.position.xPosition, "add to grid x position"))
        let defaultPosition = new Position(3,0);
        tetro.group.map(currentTetroObject=> {
    
            currentTetroObject.playable = false;
            this.collisionPoints.push(currentTetroObject);
        })

        tetro.group = []
        tetro.changePlacement(defaultPosition);
        tetro.changePlacement(defaultPosition);
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
            if (Settings.prototype.gameOn) {
               this.jTetromino.changePlacement(this.jTetromino.group[0].currentSquare.position);
            }
        })
        window.addEventListener("touchmove",action => {
   
            if (!allowtoMove) return;
            this.jTetromino.stopMovement = false
            let touchEvent = action.changedTouches[0];
            if (Math.floor(touchEvent.clientX) >recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){
                if(this.collision.wallCollision(this.jTetromino.group,"right")) return;
                if (Settings.prototype.gameOn) this.jTetromino.moveXPosition(1);
                recordedPosition = Math.floor(touchEvent.clientX);
            }

            if (Math.floor(touchEvent.clientX) < recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){

                if(this.collision.wallCollision(this.jTetromino.group,"left")) return;
                if (Settings.prototype.gameOn) this.jTetromino.moveXPosition(-1);
                recordedPosition = Math.floor(touchEvent.clientX);
            }
            if (Math.floor(touchEvent.clientY) > yRecordedPosition && (Math.floor(touchEvent.clientY) - yRecordedPosition) %10 == 0 ){
                if(this.collision.wallCollision(this.jTetromino.group,"bottom")) return;
                if (Settings.prototype.gameOn) if (Settings.prototype.gameOn) this.jTetromino.moveYPosition(1);
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
                this.jTetromino.group.map(tetro => console.log(tetro.currentSquare.position.xPosition, "tetro x position"))

                if(this.collision.wallCollision(this.jTetromino.group,"right",this.jTetromino.currentPosition)) return;
                if(this.collision.squareCollision(this.jTetromino, this.collisionPoints,"right")) return;
                if (Settings.prototype.gameOn) this.jTetromino.moveXPosition(1);
            }
            if (action.key == "ArrowLeft"){
                this.jTetromino.group.map(tetro => console.log(tetro.currentSquare.position.xPosition, "tetro x position"))
                if(this.collision.wallCollision(this.jTetromino.group,"left")) return;
                if(this.collision.squareCollision(this.jTetromino, this.collisionPoints,"left")) return;
                if (Settings.prototype.gameOn) this.jTetromino.moveXPosition(-1);
            }
            if (action.key == "ArrowDown"){
                if(this.collision.wallCollision(this.jTetromino.group,"bottom")) return;
                if (Settings.prototype.gameOn) if (Settings.prototype.gameOn) this.jTetromino.moveYPosition(1);
            }
            if (action.key == "ArrowUp"){
                if (Settings.prototype.gameOn) {
                   this.jTetromino.changePlacement(this.jTetromino.group[0].currentSquare.position);
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
        if(this.collision.wallCollision(this.jTetromino.group, "bottom")) this.addToGrid(this.jTetromino)
        if (this.collision.bototmCollision(this.jTetromino,this.collisionPoints)) this.addToGrid(this.jTetromino)

        
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