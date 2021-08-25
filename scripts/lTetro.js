
import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";
import { TetroTask } from "./tetroTask.js";

//Different positions
// |_    -|        |_      --|
// 1     2         3        4
export class LTetromino {
    constructor(){
        this.attribute = new Attribute;
        this.image = "images/orangeTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.squres = 4;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
        this.task = new TetroTask;
        this.squareImage = this.attribute.lTetrominoImage;
        this.restictPosition = false;
    

    }




    changePlacement(position,collisionPoints) {
      //  console.log(this.currentPosition, "current positions")

        if (this.currentPosition == 4) this.currentPosition = 1;
        else this.currentPosition += 1;

        if (this.currentPosition == 1){
            this.changeDefaultPosition(position,collisionPoints);     
            return;
        }    
        if (this.currentPosition == 2) {
            this.changeFirstPosition(position,collisionPoints) ;
            return;
        }

        if (this.currentPosition == 3) {
            this.changeSecondPosition(position,collisionPoints);
            return;
        }

        if(this.currentPosition == 4){
            this.changeThridPosition(position,collisionPoints);
            return;
        }

    }

    reversePlacement(position,collisionPoints){

        if (this.currentPosition == 1){
            this.changeThridPosition(position,collisionPoints);
            this.currentPosition = 4;
            return;
        }
        if(this.currentPosition == 3){
            this.changeFirstPosition(position,collisionPoints);
            this.currentPosition = 2
            return;
        }
        if(this.currentPosition == 4){
            this.changeSecondPosition(position,collisionPoints);
            this.currentPosition = 3;
            return;
        }
        if (this.currentPosition == 2){
            this.changeDefaultPosition(position,collisionPoints);
            this.currentPosition = 1;
            return;
        }
    }
    


    changeThridPosition(position,collisionPoints){
        this.task.emptySquareObjects(this.group);
        this.group = []
        let currentPosition = position;
        let addNumber = 1
        let square;

        currentPosition = currentPosition.addY(1);
        for (let num = 0; num < 3; num ++){
            square = new Square(currentPosition, this.image);
            // square.square.style.visibility = "hidden"
             square.createSquare;
     
             let squareObject = {currentSquare: square, playable:true};
             this.group.push(squareObject)
             currentPosition = currentPosition.addX(1)

        }

        currentPosition = currentPosition.addY(-1);
        currentPosition = currentPosition.addX(-1)

        square = new Square(currentPosition, this.image);
        // square.square.style.visibility = "hidden"
         square.createSquare;
 
         let squareObject = {currentSquare: square, playable:true};
         this.group.push(squareObject)

        if(this.collision.wallCollision(this.group,"right2")){
            let newPosition = position;
            newPosition = newPosition.addY(1)
            this.currentPosition = 3;
            this.changeSecondPosition(newPosition,collisionPoints)
        }

        
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)


    }



    changeDefaultPosition(position,collisionPoints,modifyPosition) {

        //console.log(position, "current position")
        this.task.emptySquareObjects(this.group);
        this.group = []
        let currentPosition = position;
        let addNumber = 1
        let square;
        let first = true;
        
        if (modifyPosition) currentPosition = currentPosition.addY(2)
        currentPosition = currentPosition.addX(1)
        for(let num = 0; num <3; num ++){
            square = new Square(currentPosition, this.image);
            // square.square.style.visibility = "hidden"
             square.createSquare;
     
             let squareObject = {currentSquare: square, playable:true};
             this.group.push(squareObject)
             currentPosition = currentPosition.addY(-1)
        }

    
        currentPosition = currentPosition.addY(3);

        for(let num = 0; num <2; num ++){
            square = new Square(currentPosition, this.image);
            // square.square.style.visibility = "hidden"
             square.createSquare;
     
             let squareObject = {currentSquare: square, playable:true};
             this.group.push(squareObject)
             currentPosition = currentPosition.addX(1)
        }

        
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }


    changeSecondPosition(position,collisionPoints){

        this.task.emptySquareObjects(this.group);
        this.group = []
        let first = true;
        let currentPosition = position;

        let square;
        let xIndex = -1
        let yIndex = 0;

        currentPosition = currentPosition.addY(-1);

        square = new Square(currentPosition, this.image);
       // square.square.style.visibility = "hidden"
        square.createSquare;

        let squareObject = {currentSquare: square, playable:true};
        this.group.push(squareObject)

        currentPosition = currentPosition.addX(1);

        for(let num =0; num < 3; num++){
            square = new Square(currentPosition, this.image);
            // square.square.style.visibility = "hidden"
             square.createSquare;
     
             let squareObject = {currentSquare: square, playable:true};
             this.group.push(squareObject)
             currentPosition = currentPosition.addY(1)

        }




        
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)

    }


    

    changeFirstPosition(position,collisionPoints) {


        this.task.emptySquareObjects(this.group);
        this.group = []
        
        let currentPosition = position
        let addNumber = 0
        let square;

        currentPosition = position.addX(-1)
        for (let num = 0; num <3; num++){
            square = new Square(currentPosition, this.image);
         //   square.square.style.visibility = "hidden"
            square.createSquare;
             
            currentPosition = currentPosition.addX(1)

            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject)

        }
        currentPosition = currentPosition.addY(1);
        currentPosition = currentPosition.addX(-3)
        square = new Square(currentPosition, this.image);
        square.square.style.visibility = "hidden"
        square.createSquare;

        let squareObject = {currentSquare: square, playable:true};
        this.group.push(squareObject)


        if (this.collision.wallCollision(this.group,"left2")){
            let newPosition = position;
            newPosition = newPosition.addX(-1)
            this.currentPosition = 1;
            this.changeDefaultPosition(newPosition,collisionPoints)
        }


        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)


      

    }
}