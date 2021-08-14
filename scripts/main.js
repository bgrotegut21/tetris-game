import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";

import {JTetromino} from "./jTetro.js";
import {OTetromino } from "./oTetro.js";
import {ZTetromino} from "./zTetro.js";

import {Position} from "./position.js"
import{Square} from "./square.js"
import {Collision} from "./collisions.js"
import {DummyItems} from "./dummyProps.js"


class Game {
    constructor(){
        this.attribute = new Attribute;

        this.jTetromino = new JTetromino;
        this.oTetromino = new OTetromino;
        this.zTetromino = new ZTetromino;

        this.tetro = this.oTetromino;
        this.tetroMove = false
        this.settings = new Settings;


        this.restrictMovement = false;
        this.collisionPoints = []
        this.bottomWallCollisionOn = true
        this.positionOfJTetromino;
        this.collision = new Collision;
        this.restrictMovement = false;
        this.row ={0:[]}
        this.xRows;

        this.spawnDummyItem = new DummyItems;
        this.canDrop = true
        this.score = this.attribute.scoreNumber;
        this.lines = this.attribute.lineNumber;

        this.differentTetromino = false;
        
        this.currentScore =0;
        this.currentLine = 0;
    }
    


    runOnce(){

        this.runKeyEvents();
        this.mouseEvent();
        this.tetro.changeDefaultPosition(new Position(3,0))
        this.tetro.currentPosition = 1;


        //this.spawnDummyItem.createTwoRowTetro()


    

    }

    deleteCollisionPoints (collisionPoints,number){
        let newCollisionPoints = collisionPoints.filter(squareObject => squareObject.currentSquare.position.yPosition != number);
        return newCollisionPoints;
    }

    moveXPosition(number){
        this.tetro.group.map(squareObject => {
            let square = squareObject.currentSquare;

            square.position = square.position.addX(number)
            square.moveSquare
            
        })

    }

    moveYPosition(number){
        this.tetro.group.map(squareObject => {
            let square = squareObject.currentSquare;

            square.position = square.position.addY(number)
            square.moveSquare
            
        })

    }


    checkRows (){
        let numberIndex = 0
        while (numberIndex != 20){
            
            if (typeof this.row[String(numberIndex)] != "undefined" && this.row[String(numberIndex)].length == 10){
                this.row[String(numberIndex)].map(squareObject=> {
                    let square = squareObject.currentSquare.square;
                    square.remove();

                })
                
                this.collisionPoints = this.deleteCollisionPoints(this.collisionPoints,Number(numberIndex))
                let row = this.collisionPoints.filter(squareObject => squareObject.currentSquare.position.yPosition == Number(numberIndex));

                this.row[String(numberIndex)] = row;
                this.bringDownBlocks(this.row);
                this.currentLine += 1;

            } else {
                let row = this.collisionPoints.filter(squareObject => squareObject.currentSquare.position.yPosition == numberIndex);
                this.row[String(numberIndex)] = row;
            }

            numberIndex += 1;
        }
        
    }


    bringDownBlocks(row){  
        let newRow = row;
        let newRowKeys = Object.keys(newRow);
        let highestLength;
        let lowestLength;
        let filteredRow = [];
        let fallingRow = []
        console.log(newRow, "new row")
        for (let number of newRowKeys){
            if(newRow[number].length != 0){
                highestLength = number;
                break
            }
        }

       for (let value of newRowKeys){
           if (value >= Number(highestLength)) filteredRow.push(value);
       }



    
       for (let number of filteredRow){
            
           if (newRow[number].length == 0){
               lowestLength = number;
               break
           }
       }
       let filteredRowLength = filteredRow.length -1;
      // if (typeof lowestLength == "undefined") lowestLength = filteredRow[String(filteredRowLength)] + 1;
       console.log(lowestLength)
        for (let value of filteredRow){
            if (value < Number(lowestLength)) fallingRow.push(value);
        }
        console.log(filteredRow, "filtered row")
        console.log(highestLength, "highest length");
        console.log(lowestLength, "lowest length")
        console.log(fallingRow,"falling row")
       // console.log(newRow, "new row")
        this.dropBlocks(fallingRow, newRow);
    


    }

    dropBlocks(fallingRow,row){
        console.log("drop blocks")
        //console.log(fallingRow, "a falling row")
      //  console.log(newRow)
        
        fallingRow.map(key => {
            row[key].map(squareObject => {
                let square = squareObject.currentSquare;
                square.position = square.position.addY(1)
                square.moveSquare;
            })
        })
        
    }
   


    addToGrid(tetro){
        
       // tetro.group.map(tetroObject => console.log(tetroObject.currentSquare.position.xPosition, "add to grid x position"))
        let defaultPosition = new Position(3,0);
        tetro.group.map(currentTetroObject=> {
    
            currentTetroObject.playable = false;
            this.collisionPoints.push(currentTetroObject);
        })

        tetro.group = []

        if(this.differentTetromino) this.tetro = this.jTetromino;

        this.tetro.changePlacement(defaultPosition);
        this.tetro.changePlacement(defaultPosition);
        this.currentScore += 18;

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
               this.tetro.changePlacement(this.tetro.group[0].currentSquare.position);
            }
        })
        window.addEventListener("touchmove",action => {
   
            if (!allowtoMove) return;
            this.tetro.stopMovement = false
            let touchEvent = action.changedTouches[0];
            if (Math.floor(touchEvent.clientX) >recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){
                if(this.collision.wallCollision(this.tetro.group,"right")) return;
                if (Settings.prototype.gameOn) this.tetro.moveXPosition(1);
                recordedPosition = Math.floor(touchEvent.clientX);
            }

            if (Math.floor(touchEvent.clientX) < recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){

                if(this.collision.wallCollision(this.tetro.group,"left")) return;
                if (Settings.prototype.gameOn) this.moveXPosition(-1);
                recordedPosition = Math.floor(touchEvent.clientX);
            }
            if (Math.floor(touchEvent.clientY) > yRecordedPosition && (Math.floor(touchEvent.clientY) - yRecordedPosition) %10 == 0 ){
                if(this.collision.wallCollision(this.tetro.group,"bottom")) return;
                if (Settings.prototype.gameOn) if (Settings.prototype.gameOn) this.moveYPosition(1);
                yRecordedPosition = Math.floor(touchEvent.clientY);
            }
    
         


        },{passive:true});
        window.addEventListener("touchend", () => {
      
            allowtoMove = false;
        })
      
        
    }

    checkZTetro(tetro){
        if (tetro.currentPosition == 2){
            return true
        
        }

    }

    checkJTetro(tetro){

        if (tetro.currentPosition == 2){
            console.log(tetro.currentPosition, "tetro current position")
            return true;
        }
    }

    checkType (tetro) {
        console.log(tetro, "this is tetro")
        if (tetro.type == "zTetromino") {
            if (this.checkZTetro(tetro)) return true;
        }
        if (tetro.type == "jTetromino") {
            if (this.checkJTetro(tetro)) return true;
        }
    }
    updateXRows(){
        let xRows = {0:[]}
        let index = 0;
        while (index != 20){
            let currentXRow = this.collisionPoints.filter(squareObject => squareObject.currentSquare.position.xPostion == index);
            xRows[String(index)] = currentXRow;
            index++;
            
        }

        return xRows;

    }

    runKeyEvents(){
        window.addEventListener("keydown", action => {
            if (action.key == "ArrowRight") { 
                //this.jTetromino.group.map(tetro => console.log(tetro.currentSquare.position.xPosition, "tetro x position"))
             //   console.log(this.row)
                if(this.collision.wallCollision(this.tetro.group,"right",this.tetro.currentPosition)) return;
                if(this.collision.squareCollision(this.tetro, this.collisionPoints,"right")) return;
                if (Settings.prototype.gameOn) this.moveXPosition(1);
            }
            if (action.key == "ArrowLeft"){
              //  this.jTetromino.group.map(tetro => console.log(tetro.currentSquare.position.xPosition, "tetro x position"))
                //onsole.log("\n")
                if(this.collision.wallCollision(this.tetro.group,"left")) return;
                if(this.collision.squareCollision(this.tetro, this.collisionPoints,"left")) return;
                if (Settings.prototype.gameOn) this.moveXPosition(-1);
            }
            if (action.key == "ArrowDown"){
                if(this.collision.wallCollision(this.tetro.group,"bottom")) return;
                if (Settings.prototype.gameOn) if (Settings.prototype.gameOn) this.moveYPosition(1);
            }
            if (action.key == "ArrowUp"){
                if (Settings.prototype.gameOn) {
                    if(this.collision.squareCollision(this.tetro, this.collisionPoints,"left") && this.checkType(this.tetro) ) return;
                    console.log(this.tetro, "this tetro")
                    this.tetro.changePlacement(this.tetro.group[0].currentSquare.position)
                    
                }
            }
            if (action.key == "x"){
                if (Settings.prototype.gameOn) {
                    console.log(this.tetro, "this tetro")
                   this.differentTetromino = true;
                    
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
        }
        )}

        updateStats(){
            this.score.textContent = this.currentScore;
            this.lines.textContent = this.currentLine;
        }
    

    

    runGame(){
        if(this.collision.wallCollision(this.tetro.group, "bottom")) this.addToGrid(this.tetro)
        this.updateStats();
        this.xRows = this.updateXRows();
        if (this.collision.bototmCollision(this.tetro,this.xRows)) this.addToGrid(this.tetro)
        this.checkRows(this.collisionPoints);
      //  if (this.canDrop){
        //    this.canDrop = false;
          //  this.addToGrid(this.spawnDummyItem)

//        }
 
        

        
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