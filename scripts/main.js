import { Attribute } from "./attributes.js";
import { Settings } from "./settings.js";

import {JTetromino} from "./jTetro.js";
import {OTetromino } from "./oTetro.js";
import {ZTetromino} from "./zTetro.js";
import { TTetromino } from "./tTetro.js";
import {ITetromino} from "./iTetromino.js"
import {STetromino} from "./sTetro.js";
import { LTetromino } from "./lTetro.js";

import {Position} from "./position.js"
import{Square} from "./square.js"
import {Collision} from "./collisions.js"
import {DummyItems} from "./dummyProps.js"


let attribute = new Attribute;
let gameOn = false;
let pausedGame = false;

class Game {
    constructor(){
        this.attribute = new Attribute;

        this.jTetromino = new JTetromino;
        this.oTetromino = new OTetromino;
        this.zTetromino = new ZTetromino;
        this.tTetromino = new TTetromino;
        this.iTetromino =  new ITetromino;
        this.sTetromino = new STetromino;
        this.lTetromino = new LTetromino;


        this.tetrominos = [this.jTetromino, this.oTetromino, this.zTetromino,
                            this.tTetromino, this.iTetromino, this.sTetromino, this.lTetromino
        ];
        this.tetro = this.jTetromino;

        this.tetroMove = false
        this.settings = new Settings;
        this.nextTetromino;


        this.restrictMovement = false;
        this.collisionPoints = []
        this.bottomWallCollisionOn = true
        this.positionOfJTetromino;
        this.collision = new Collision;
        this.restrictMovement = false;
        this.row ={0:[]};
        this.yRows;
        this.xRows;

        this.spawnDummyItem = new DummyItems;
        this.canDrop = true
        this.score = this.attribute.scoreNumber;
        this.lines = this.attribute.lineNumber;
        this.defaultPosition = new Position(4,0)

        this.differentTetromino = false;
        this.firstClick = true;
        this.currentScore =0;
        this.currentLine = 0;
        this.stopAutoDrop = false;
        this.lastTime = Date.now()
    }
    




    runOnce(){


        this.runKeyEvents();
        this.mouseEvent();
        this.clickEvents();
        

        this.tetro = this.spawnRandomTetro();

        this.tetro.changeDefaultPosition(this.defaultPosition,this.collisionPoints,true);
        this.tetro.currentPosition = 1;

        this.nextTetromino = this.spawnRandomTetro();
        this.displayRandomTetro(this.nextTetromino)
        this.blackOut(true);
        this.closeSquareImages()
        this.checkMediaQuery();


        //this.spawnDummyItem.createTwoRowTetro()


    

    }




    closeSquareImages(){
        this.tetrominos.map(tetro => {
    
            tetro.squareImage.style.display = "none";
        })
    }

    displayRandomTetro(tetro){
        this.closeSquareImages();
        tetro.squareImage.style.display = "block"
    }

    spawnRandomTetro(){
        let randomIndex = Math.floor(Math.random() * 7);
        return this.tetrominos[randomIndex];
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
       this.updateLines(1);
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

        this.tetro = this.nextTetromino;
        this.nextTetromino = this.spawnRandomTetro();
        this.displayRandomTetro(this.nextTetromino)
        this.tetro.changeDefaultPosition(defaultPosition,this.collisionPoints,true)
        this.tetro.currentPosition = 1;
        if (this.tetro.type == "lTetromino"){
            if(this.collision.vetricalRowCollision(this.collisionPoints,2)){
                if (this.collision.normalCollision(this.tetro,this.collisionPoints)){
                    this.resetGame("Game Over!")
                }
            }
        } else {
            if (this.collision.vetricalRowCollision(this.collisionPoints,1)){
                if (this.collision.normalCollision(this.tetro,this.collisionPoints)){
                   this.resetGame("Game Over!")
                }
            }
        }
        this.updateScore(18)


    }
    updateScore(number){
        this.currentScore += number;
        this.updateStats();
    }

    updateLines(number){
        this.currentLine += number;
        this.updateStats();
    }

    

    mouseEvent (){
        
        let allowtoMove = false;
        let recordedPosition;
        let yRecordedPosition;
        window.addEventListener("touchstart", action => {
            if (!gameOn) return;
            let touchEvent= action.changedTouches[0];
            recordedPosition = Math.floor(touchEvent.clientX);
            yRecordedPosition = Math.floor(touchEvent.clientY);

            allowtoMove = true
        });
        window.addEventListener("click",() => {
            if (gameOn) {
                if (this.firstClick) this.firstClick = false;
                else this.tetro.changePlacement(this.tetro.group[0].currentSquare.position,this.collisionPoints);
            }
        })
        window.addEventListener("touchmove",action => {
   
            if (!allowtoMove) return;
            this.tetro.stopMovement = false
            let touchEvent = action.changedTouches[0];
            if (Math.floor(touchEvent.clientX) >recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){
                if(this.collision.wallCollision(this.tetro.group,"right")) return;
                if (gameOn) this.moveXPosition(1);
                recordedPosition = Math.floor(touchEvent.clientX);
            }

            if (Math.floor(touchEvent.clientX) < recordedPosition && (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0){

                if(this.collision.wallCollision(this.tetro.group,"left")) return;
                if (gameOn) this.moveXPosition(-1);
                recordedPosition = Math.floor(touchEvent.clientX);
            }
            if (Math.floor(touchEvent.clientY) > yRecordedPosition && (Math.floor(touchEvent.clientY) - yRecordedPosition) %10 == 0 ){
                if (gameOn) if (gameOn) this.moveYPosition(1);
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
       // console.log(tetro, "this is tetro")
        if (tetro.type == "zTetromino") {
            if (this.checkZTetro(tetro)) return true;
        }
        if (tetro.type == "jTetromino") {
            if (this.checkJTetro(tetro)) return true;
        }
    }

    
  startGame(){
    gameOn = true;
    this.blackOut(false)
    this.attribute.modeText.style.display = "none";
    this.nextTetromino.squareImage.style.display = "block";
     
    this.firstClick = true;
    this.lastTime = Date.now();
    startTimer();

  }



    clickEvents() {
        this.attribute.modeText.addEventListener("click", () => {
            if (this.attribute.modeText.textContent == "Play"){
                this.startGame();
            } 
            if (this.attribute.modeText.textContent == "Game Over!"){
                this.startGame()
            }

            if (this.attribute.modeText.textContent == "Paused"){

                this.startGame()
            }
        })
        this.attribute.pasueButton.addEventListener("click", () => {
            if (gameOn){
                this.closeSquareImages()
                this.attribute.modeText.textContent = "Paused"
                this.attribute.modeText.style.display = "block";
                this.firstClick = true;
                this.blackOut(true);
                gameOn = false;
                startTimer();
            } else {
                this.nextTetromino.squareImage.style.display = "block";
                this.startGame()
            }
        }) 

        this.attribute.quitButton.addEventListener("click", () => {
            this.resetGame("Play")
        })

    
    }

    runKeyEvents(){
        window.addEventListener("keydown", action => {
            if (action.key == "ArrowRight") { 
                //this.jTetromino.group.map(tetro => console.log(tetro.currentSquare.position.xPosition, "tetro x position"))
             //   console.log(this.row)
                if(this.collision.wallCollision(this.tetro.group,"right",this.tetro.currentPosition)) return;
                if(this.collision.squareCollision(this.tetro, this.collisionPoints,"right")) return;
                if (gameOn) this.moveXPosition(1);
            }
            if (action.key == "ArrowLeft"){
              //  this.jTetromino.group.map(tetro => console.log(tetro.currentSquare.position.xPosition, "tetro x position"))
                //onsole.log("\n")
                if(this.collision.wallCollision(this.tetro.group,"left")) return;
                if(this.collision.squareCollision(this.tetro, this.collisionPoints,"left")) return;
                if (gameOn) this.moveXPosition(-1);
            }
            if (action.key == "ArrowDown"){
                if(this.collision.wallCollision(this.tetro.group,"bottom")) return;
                if (gameOn)  this.moveYPosition(1);
            }
            if (action.key == "ArrowUp"){
          //p      console.log(this.tetro)
                if (gameOn) {
                   
           //         console.log(this.tetro, "this tetro")
                   // console.log(this.tetro.group, "this tetro group")
                    this.tetro.changePlacement(this.tetro.group[0].currentSquare.position,this.collisionPoints)
                    
                }
            }
            if (action.key == "x"){
                if (gameOn) {
                    console.log(this.tetro, "this tetro")
                   this.differentTetromino = true;
                    
                }
            }

            if (action.key == "q") {

                gameOn = false;
                startTimer();
            }
            if(action.key == "p") {
                console.log("unpause")
                gameOn = true
                startTimer();
            }
            action.preventDefault();
        }
        )}

        updateStats(){
            this.score.textContent = this.currentScore;
            this.lines.textContent = this.currentLine;
        }
    

        
    createYRows(){
        let index = 0;
        let rows = {0:[]}
        while (index != 20){
            let filteredYRow = this.collisionPoints.filter(squareObject => squareObject.currentSquare.position.yPosition == index);
            rows[String(index)] = filteredYRow;
            if (filteredYRow.length == 0) rows[String(index)] = ["empty"];
            index++;

        }

        return rows;
    }



    checkMediaQuery(){
        
        let minWidth = window.matchMedia("(max-width:320px)");
       // console.log(minWidth);
        minWidth.addEventListener("change", () => {
            console.log(minWidth.matches, "min width matches")
            if (minWidth.matches) this.resizeSquares();
        })
    }

    resizeSquares(){
        gameOn = false;
        startTimer();
        this.collisionPoints.map(squareObject => {

            let square = squareObject.currentSquare;
            square.reduceSquareSize;
        })

        this.tetro.group.map(tetroObject => {
            let square = tetroObject.currentSquare;
            square.reduceSquareSize;

        })
    

    }

    createXRows(){
        let index = 0;
        let rows = {0:[]}
        while (index != 10){
            let filteredYRow = this.collisionPoints.filter(squareObject => squareObject.currentSquare.position.xPosition == index);
            rows[String(index)] = filteredYRow;
            index++;

        }
     //   console.log(rows, "rows")
        return rows;
    }

    resetBoard (){
        this.collisionPoints.map(squareObject => {
            squareObject.currentSquare.square.remove();
        })
        this.collisionPoints = [];
    }

    removeAllSquares(){
        let currentSquare = document.querySelectorAll(".square");
        for (let square of currentSquare){
            square.remove();
        }
    }

    blackOut(bool){
        let currentSquare = document.querySelectorAll(".square");
        if (bool){
            
            for (let square of currentSquare){
                square.style.display = "none";
            } 
            } else {
                for (let square of currentSquare){
                    square.style.display = "block"
                }
            }
        }
    

    resetGame (message){
        console.log(message, "a current message")
        this.attribute.modeText.textContent = message;
        this.attribute.modeText.style.display  = "block";
        this.currentScore = 0;
        this.currentLine = 0;
        this.updateStats();
        this.resetBoard();
        this.removeAllSquares();
        this.tetro = this.spawnRandomTetro();
        //this.nextTetromino = this.spawnRandomTetro();
        this.displayRandomTetro(this.nextTetromino);
        this.tetro.changeDefaultPosition(this.defaultPosition,this.collisionPoints,true);
        this.blackOut(true);



        gameOn = false;



    }


    autoDropBlock(){
        let currentTime = Date.now();
        
        if (currentTime - this.lastTime >= 500){
            this.lastTime = currentTime;
            this.moveYPosition(1);
        }   
        
    }

    runGame(){
       // console.log(this.tetro.group, "tetro group")
        if(this.collision.wallCollision(this.tetro.group, "bottom")) this.addToGrid(this.tetro)
        this.updateStats();
        this.xRows = this.createXRows();
        this.yRows = this.createYRows();
        this.xRows = this.createXRows();
        if (this.collision.vetricalRowCollision(this.collisionPoints)) this.resetGame("Game Over!");
        this.autoDropBlock()
        this.checkMediaQuery()

        
  
        this.checkRows();
        
       this.collision.detectCollision(this.tetro,this.collisionPoints)
        if (this.collision.levelCollision(this.tetro,this.xRows,this.collisionPoints)) this.addToGrid(this.tetro);
       

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
        if(!gameOn) clearInterval(timer);
        game.runGame()
    },10)
}


