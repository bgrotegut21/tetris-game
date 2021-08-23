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
        this.image = "images/greenTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.squres = 4;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
        this.task = new TetroTask;
        this.type = "sTetromino";
        this.restictPosition = false;
    

    }




    changePlacement(position,collisionPoints){
      //  console.log(this.currentPosition, "current positions")
        if(this.restictPosition) return true;
        if (this.currentPosition == 1) this.currentPosition = 1;
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
            square.square.style.visibility = "hidden"
            square.createSquare;
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }  




        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)

    }



    changeDefaultPosition(position,collisionPoints) {
        console.log("chande defualt position")
        this.task.emptySquareObjects(this.group);
        this.group = []
        
        let square;
        let currentPosition = position;

        for (let num = 0; num <2){
            square = new Square(currentPosition, this.image);
            //square.square.style.visibility = "hidden";
            square.createSquare;
            currentPosition = currentPOsition.addX(1);

            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);
        }

        currentPosition = currentPosition.addX(-2)
        currentPosition = currentPosition.addY(1);

        for (let num = 0; num <2){
            square = new Square(currentPosition, this.image);
            //square.square.style.visibility = "hidden";
            square.createSquare;
            currentPosition = currentPOsition.addX(-1);

            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);

        }


        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }

}