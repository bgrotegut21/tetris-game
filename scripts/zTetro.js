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
        this.squareImage = this.attribute.zTetrominoImage;
        this.restictPosition = false;
        this.reduceSize = false;
    }

    changePlacement(position,collisionPoints){
        if(this.restictPosition) return true;
        if (this.currentPosition == 2) this.currentPosition = 1;
        else this.currentPosition += 1;

        if (this.currentPosition == 1){
            this.changeDefaultPosition(position,collisionPoints);     
            return;
        }    
        if (this.currentPosition == 2) {
            this.changeFirstPosition(position,collisionPoints) ;
            return;
        }
    }

    reversePlacement(position,collisionPoints){
        if (this.currentPosition == 1){
            this.changeFirstPosition(position,collisionPoints);
            this.currentPosition = 2;
            return;
        }
        if (this.currentPosition == 2){
            this.changeDefaultPosition(position,collisionPoints);
            this.currentPosition = 1;
            return;
        }
    }

    changeFirstPosition(position,collisionPoints){
        this.task.emptySquareObjects(this.group);
        this.group = [];
        let square;
        let currentPosition = position;
        currentPosition = currentPosition.addX(2);
        
        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            currentPosition = currentPosition.addY(1);
            this.task.checkSize(square, this.reduceSize)
            square.square.style.visibility = "hidden"
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }  

        currentPosition = currentPosition.addX(-1);
        currentPosition = currentPosition.addY(-1);
        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            currentPosition = currentPosition.addY(1);
            this.task.checkSize(square, this.reduceSize)
            square.square.style.visibility = "hidden"
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }  
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }

    changeDefaultPosition(position,collisionPoints,modifyPosition) {
        this.task.emptySquareObjects(this.group);
        this.group = []
        
        let square;
        let currentPosition = position;

        currentPosition = currentPosition.addX(-2)
        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            currentPosition = currentPosition.addX(1);
            square.square.style.visibility = "hidden";
            this.task.checkSize(square, this.reduceSize)
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }  

        currentPosition = currentPosition.addX(-1)
        currentPosition = currentPosition.addY(1);
        for (let num = 0; num < 2; num ++){
            square = new Square(currentPosition,"images/redTetromino.svg");
            square.square.style.visibility = "hidden";
            this.task.checkSize(square, this.reduceSize)
            square.createSquare;
            currentPosition = currentPosition.addX(1);
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        } 
        if(this.collision.wallCollision(this.group,"left2")){
            this.currentPosition = 2;
            this.changeFirstPosition(position.addX(-2),collisionPoints);
        
        }
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }
}