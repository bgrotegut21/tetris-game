
import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";
import { TetroTask } from "./tetroTask.js";



export class OTetromino {
    constructor(){
        this.attribute = new Attribute;
        this.image = "images/yellowTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
        this.task = new TetroTask;
        this.type = "oTetromino"
        this.restictPosition = false;

    }




    changePlacement(position){
        this.changeDefaultPosition(position)
    }


    changeDefaultPosition(position){
        this.task.emptySquareObjects(this.group);
        this.group = []
        let square;
        let currentPosition = position;
        for (let number = 0; number < 2; number++) {
            square = new Square(currentPosition,"images/yellowTetromino.svg");
            currentPosition = currentPosition.addX(1);
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject)
        }
        currentPosition = currentPosition.addY(1);
        currentPosition = currentPosition.addX(-2);
        for (let number = 0; number < 2; number++) {
            square = new Square(currentPosition,"images/yellowTetromino.svg");
            currentPosition = currentPosition.addX(1);
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject)
        }

    }
      
}