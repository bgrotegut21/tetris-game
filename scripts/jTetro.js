
import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";


export class JTetromino {
    constructor(){
        this.attribute = new Attribute;
        this.image = "images/blueTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.squres = 4;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
    }
//Different positions
// |_    -|        |_      --|
// 1     2         3        4
    moveXPosition(number){
        this.group.map(squareObject => {
            let square = squareObject.currentSquare;

            square.position = square.position.addX(number)
            square.moveSquare
            
        })

    }

    moveYPosition(number){
        this.group.map(squareObject => {
            let square = squareObject.currentSquare;

            square.position = square.position.addY(number)
            square.moveSquare
            
        })

    }


    changePlacement(position){
        if (this.currentPosition == 1) {
            this.changeDefaultPosition(position)
        }
        if (this.currentPosition == 2){
            this.changeFirstPosition(position);
        }
        if (this.currentPosition == 2) this.currentPosition = 1;
        else this.currentPosition += 1;
    }

    changeFirstPosition(position){
        this.removeSquareGroup()
        let first = true;
        let currentPosition = position;
        let square;
        let xIndex = -1
        let yIndex = 0;

        for (let num = 0; num <4; num ++){
            if (first){
                square = new Square(currentPosition,"images/blueTetromino.svg");
                square.createSquare;
                currentPosition = currentPosition.addX(1)
                first = false;
            } else {
                currentPosition = currentPosition.addY(yIndex)
                square = new Square(currentPosition,"images/blueTetromino.svg");
                square.createSquare;
                currentPosition = currentPosition.addX(xIndex)
                yIndex = 1;
                xIndex = 0
            }
            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);
        }
    }


    removeSquareGroup(){
        for(let squareObject of this.group){
            let squareClass = squareObject.currentSquare;
            squareClass.square.remove();
        }
        this.group = []
    }

    changeDefaultPosition(position) {

        this.removeSquareGroup();
       
        let first = true;
        let currentPosition = position
        let addNumber = 0
        let square;
        for(let num = 0; num < 4; num ++){

            if (first){

                square = new Square(currentPosition, "images/blueTetromino.svg");
                square.createSquare;
                
                currentPosition = currentPosition.addY(1)
                first = false;

            } else {
                currentPosition = currentPosition.addX(addNumber)
                square = new Square(currentPosition, "images/blueTetromino.svg")
                square.createSquare;
                addNumber =1;
            }
            let squareObject = {currentSquare: square, playable: true};
            this.group.push(squareObject)
        }
        if(this.collision.wallCollision(this.group,"right2")) this.changeFirstPosition(position)
    }
}