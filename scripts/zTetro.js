import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";
import { TetroTask } from "./tetroTask.js";

//Different positions
// |_    -|        |_      --|
// 1     2         3        4
export class ZTetromino {
    constructor(){
        this.attribute = new Attribute;
        this.image = "images/blueTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.squres = 4;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
        this.task = new TetroTask;
        this.type = "zTetromino"
        this.restictPosition = false;
    

    }




    changePlacement(position){
      //  console.log(this.currentPosition, "current positions")
        if(this.restictPosition) return true;
        if (this.currentPosition == 2) this.currentPosition = 1;
        else this.currentPosition += 1;

        if (this.currentPosition == 1){
            this.changeDefaultPosition(position);     
            return;
        }    
        if (this.currentPosition == 2) {
            this.changeFirstPosition(position) ;
            return;
        }

        if (this.currentPosition == 3) {
            this.changeSecondPosition(position);
            return;
        }
    }




    changeFirstPosition(position){
        this.task.emptySquareObjects(this.group);
        this.group = [];
        let square;
        let currentPosition = position;

        currentPosition = currentPosition.addX(2);
        
        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            currentPosition = currentPosition.addY(1);
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }  

        currentPosition = currentPosition.addX(-1);
        currentPosition = currentPosition.addY(-1);


        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            currentPosition = currentPosition.addY(1);
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }  


    }



    changeDefaultPosition(position) {
        this.task.emptySquareObjects(this.group);
        this.group = []
        
        let square;
        let currentPosition = position;

        currentPosition = currentPosition.addX(-2)
        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            currentPosition = currentPosition.addX(1);
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }  

        currentPosition = currentPosition.addX(-1)
        currentPosition = currentPosition.addY(1);
        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            square.createSquare;
            currentPosition = currentPosition.addX(1);
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        } 
    }
}