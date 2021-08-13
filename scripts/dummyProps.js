import { Position } from "./position.js";
import { Square } from "./square.js";


export class DummyItems{
    constructor(){
        this.image = "images/blueTetromino.svg";
        this.group = []

    }

    createTwoRowTetro(){
        let square;
        let currentPosition = new Position(0,19);

        for (let num = 0; num < 10; num ++){
            square = new Square(currentPosition,this.image)
            square.position = currentPosition;
            currentPosition = currentPosition.addX(1);
            square.createSquare;
            let squareObject = {playable: false, currentSquare: square};
            this.group.push(squareObject)
        }
        currentPosition = currentPosition.timesX(0)
        currentPosition = currentPosition.addY(-1)

        for (let num = 0; num < 10; num ++){
            square = new Square(currentPosition, this.image)
            square.position = currentPosition;
            currentPosition = currentPosition.addX(1);
            square.createSquare;
            let squareObject = {playable: false, currentSquare: square};
            this.group.push(squareObject)
        }
        
        currentPosition =  currentPosition.timesX(0)
        currentPosition = currentPosition.addY(-1)
        for (let num = 0; num < 5; num ++){
            square = new Square(currentPosition, this.image)
            square.position = currentPosition;
            currentPosition = currentPosition.addX(1);
            square.createSquare;
            let squareObject = {playable: false, currentSquare: square};
            this.group.push(squareObject)
        }


    }

}