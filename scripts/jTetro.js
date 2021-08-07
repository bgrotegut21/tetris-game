
import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";

export class JTetromino {
    constructor(position){
        this.attribute = new Attribute;
        this.image = "images/blueTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.position = position;
        this.squres = 4;
        this.group = []
        this.moveTetro = true;
        this.lastXPosition;
        this.currentPosition = 1;
        this.stopMovement = false;
        this.gridWidth = 150;
        this.gridWidth2 = 175;
        this.gridHeight = 450;
        this.gridHeight2 = 425;
        
    



    }



//Different positions
// |_    -|        |_      --|
// 1     2         3        4

    changePosition (position){
        if (this.stopMovement) return;
        if(this.currentPosition == 1) this.moveDefaultPosition(position);
        if (this.currentPosition == 2) this.moveFirstPosition(position);
    }

    moveXPosition(number){
        this.group.map(squareObject => {
            let square = squareObject.currentSquare;
            let newPosition = square.position.addX(number);
            console.log(newPosition)
            square.position = newPosition;
            square.moveSquare
        })
    }
    moveYPosition(number){
        this.group.map(square => {
            square.addY(number);
        })
    }


    changePlacement(){
        
 
        if (this.currentPosition == 1) {

          //  if(this.position.xPosition >= this.gridWidth) return true;
            this.stopMovement = true;
            this.changeDefaultPosition()
        }
        if (this.currentPosition == 2){
            if (this.position.xPosition >= this.gridWidth2) return;
            this.stopMovement = true;
            this.changeFirstPosition();
        }
        if (this.currentPosition == 2) this.currentPosition = 1;
        else this.currentPosition += 1;



    }

    changeFirstPosition(){
        this.removeSquareGroup()
        let first = true;
        let sizeXposition = 0;
        let sizeYPosition = 0;
        let square;
        for (let i = 0; i <4; i++){
            if (first){
                square = document.createElement("div");
                square.setAttribute("class","square");
                square.style.background = `url(${this.image})`

                this.attribute.grid.appendChild(square)
                first = false;
                sizeXposition +=  1;
            } else {
                square = document.createElement("div");
                square.setAttribute("class","square");
                square.style.background = `url(${this.image})`
                square.style.left = this.sizeX * sizeXposition + "px";
                sizeXposition = 0;
                square.style.top = this.sizeY * sizeYPosition + "px";
                sizeYPosition +=1;
                this.attribute.grid.appendChild(square)


            }
            let squareObject = {playable: true, currentSquare:square}
            this.group.push(squareObject);
        }
        this.stopMovement = false;
        this.changePosition(this.position)

    }


    removeSquareGroup(){

        for(let squareObject of this.group){
            let squareClass = squareObject.currentSquare;
            squareClass.square.remove();
        }
        this.group = []
    }
    

    changeDefaultPosition() {
        this.removeSquareGroup();

        let first = true;
        let currentPosition = new Position(0,0)
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



    }

  

  






}