import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";
import { TetroTask } from "./tetroTask.js";
export class ITetromino {
    constructor(){
        this.attribute = new Attribute;
        this.image = "images/lightBlueTetromino.svg"
        this.squres = 4;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
        this.task = new TetroTask;
        this.squareImage = this.attribute.iTetrominoImage;
        this.reduceSize = false;
    }

    changePlacement(position,collisionPoints){
        if (this.currentPosition == 2) this.currentPosition = 1;
        else this.currentPosition += 1;

        if (this.currentPosition == 1){
            let newPosition = position;
            newPosition = newPosition.addX(1);
            newPosition = newPosition.addY(-1);
            this.changeDefaultPosition(newPosition,collisionPoints);     
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
            let newPosition = position;
            newPosition = newPosition.addX(1);
            newPosition = newPosition.addY(-1);
            this.changeDefaultPosition(newPosition,collisionPoints);
            this.currentPosition = 1;
            return;
        }
    }

    changeFirstPosition(position,collisionPoints){
        this.task.emptySquareObjects(this.group);
        this.group = [];
        let square;
        let currentPosition = position;
        currentPosition = currentPosition.addY(1);
        currentPosition = currentPosition.addX(-1);

        for (let num = 0; num <4; num ++){
            square = new Square(currentPosition,this.image);
            square.square.style.visibility = 'hidden';
            this.task.checkSize(square, this.reduceSize)
            square.createSquare;
            currentPosition = currentPosition.addX(1);

            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);
        }
        if(this.collision.wallCollision(this.group,"left2")){
            let newPosition = this.group[0].currentSquare.position;
            newPosition = newPosition.addX(1);
            newPosition = newPosition.addY(-1)
            this.changeDefaultPosition(newPosition,collisionPoints)
            this.currentPosition = 1;
        }
        if (this.collision.wallCollision(this.group,"right2")){
            let newPosition = this.group[0].currentSquare.position;
            newPosition = newPosition.addX(1);
            newPosition = newPosition.addY(-1)
            this.changeDefaultPosition(newPosition,collisionPoints)
            this.currentPosition = 1;
            
        }
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }

    changeDefaultPosition(position,collisionPoints) {
        this.task.emptySquareObjects(this.group);
        this.group = []
        let square;
        let currentPosition = position;
        for (let num = 0; num < 4; num ++){
            square = new Square(currentPosition,this.image);
            this.task.checkSize(square, this.reduceSize)
            square.square.style.visibility = "hidden";
            square.createSquare;
            currentPosition = currentPosition.addY(1);
            let squareObject = {currentSquare:square, playable: true};
            this.group.push(squareObject);
        }
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }

}