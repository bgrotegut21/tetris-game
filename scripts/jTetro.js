
import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";

//Different positions
// |_    -|        |_      --|
// 1     2         3        4
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
        let changePositions = true

    }

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
        console.log(this.currentPosition, "current positions")
        if (this.currentPosition == 4) this.currentPosition = 1;
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

        if(this.currentPosition == 4){
            this.changeThridPosition(position);
            return;
        }

    }

    changeSecondPosition(position){
        this.removeSquareGroup()
        let currentPosition = position;
        let addNumber = 1
        let square;

       currentPosition = currentPosition.addX(-1)
        for (let num =0; num <4; num ++){

            if (num == 2) addNumber = 0;
            if (num == 3){
                currentPosition = currentPosition.addY(1);
                square = new Square(currentPosition, "images/blueTetromino.svg");
                square.createSquare;
                
            } else {

                square = new Square(currentPosition, "images/blueTetromino.svg");
                square.createSquare;
                currentPosition = currentPosition.addX(addNumber);
            }
            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);
        }
        if (this.collision.wallCollision(this.group,"left")){
            console.log("adding stuff")
            this.changeFirstPosition(position.addX(-1));
            this.currentPosition = 2;
        }


    }

    changeThridPosition(position){
        console.log(position, "current position")
        this.removeSquareGroup();
        let currentPosition = position;
        let addNumber = 1
        let square;
        let first = true;
        currentPosition = currentPosition.addX(1)

        for (let num = 0; num < 4; num ++){
            if (num == 3){
                currentPosition = currentPosition.addX(-1)
                currentPosition = currentPosition.addY(-1)
                square = new Square(currentPosition,"images/blueTetromino.svg");
                square.createSquare;
            } else {
                square = new Square(currentPosition, "images/blueTetromino.svg");
                square.createSquare;
                currentPosition = currentPosition.addY(1);
            }
            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);
        }
     

    }

    changeFirstPosition(position){

        this.removeSquareGroup()
        let first = true;
        let currentPosition = position;

        let square;
        let xIndex = -1
        let yIndex = 0;

        currentPosition = currentPosition.addX(1)

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

        currentPosition = currentPosition.addX(-1)
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
        if (this.collision.wallCollision(this.group,"right2")){
            console.log("adding stuff")
            this.changeThridPosition(position.addX(-1));
            this.currentPosition = 4;
        }
      

    }
}