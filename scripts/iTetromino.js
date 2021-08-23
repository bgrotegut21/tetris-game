import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";
import { TetroTask } from "./tetroTask.js";

//Different positions
// |_    -|        |_      --|
// 1     2         3        4
export class ITetromino {
    constructor(){
        this.attribute = new Attribute;
        this.image = "images/lightBlueTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.squres = 4;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
        this.task = new TetroTask;
        this.type = "iTetromino"
        this.restictPosition = false;
    

    }




    changePlacement(position,collisionPoints){
      //  console.log(this.currentPosition, "current positions")
        if(this.restictPosition) return true;
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
        console.log("reverse placement ")
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
        //currentPosition = currentPosition.addX(-1);

        for (let num = 0; num <4; num ++){
            square = new Square(currentPosition,this.image);
            square.square.style.visibility = 'hidden';
            square.createSquare;
            currentPosition = currentPosition.addX(1);

            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);

        }

      

        if(this.collision.wallCollision(this.group,"left2")){
            console.log("colliding")
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
        console.log("chande defualt position")
        this.task.emptySquareObjects(this.group);
        this.group = []
        let square;
        let currentPosition = position;

        for (let num = 0; num < 4; num ++){
            square = new Square(currentPosition,this.image);
            square.square.style.visibility = "hidden";
            square.createSquare;
            currentPosition = currentPosition.addY(1);
            let squareObject = {currentSquare:square, playable: true};
            this.group.push(squareObject);

        }
        
 


        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }

}