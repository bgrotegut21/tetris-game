import { Attribute } from "./attributes.js";
import { Position } from "./position.js";
import { Square } from "./square.js";
import { Collision } from "./collisions.js";
import { TetroTask } from "./tetroTask.js";

//Different positions
// |_    -|        |_      --|
// 1     2         3        4
export class TTetromino {
    constructor(){
        this.attribute = new Attribute;
        this.image = "images/purpleTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.squres = 4;
        this.group = []
        this.currentPosition = 1;
        this.collision = new Collision;
        this.task = new TetroTask;
        this.type = "tTetromino"
        this.restictPosition = false;
    

    }




    changePlacement(position,collisionPoints) {
        //console.log(this.currentPosition, "current position")
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
            this.changeThirdPosition(position,collisionPoints)
            return;
        }

    }

    reversePlacement(position,collisionPoints){

        if (this.currentPosition == 1){
        
            this.changeThirdPosition(newPosition.addY(1),collisionPoints)
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
    


    changeThirdPosition(position,collisionPoints){
    
        this.task.emptySquareObjects(this.group);
        this.group = []
        let currentPosition = position;
        let addNumber = 1
        let square;
        currentPosition = currentPosition.addX(1);
        currentPosition = currentPosition.addY(-1);




       for (let num  = 0; num < 4; num ++){
           if (num == 3){
               currentPosition = currentPosition.addX(1);
               currentPosition = currentPosition.addY(-2);
               square = new Square(currentPosition, this.image);
               //square.square.style.visibility = 'hidden';
               square.createSquare;
           } else {
               square = new Square(currentPosition, this.image);
               //square.square.style.visibility = 'hidden';
               square.createSquare;
               currentPosition = currentPosition.addY(1);
           }
           let squareObject = {currentSquare: square, playable:true};
           this.group.push(squareObject);
       }






        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }



    changeSecondPosition(position,collisionPoints){
        this.task.emptySquareObjects(this.group);
        this.group = []
        let currentPosition = position;
        let addNumber = 1
        let square;
        currentPosition = currentPosition.addY(1)
        currentPosition = currentPosition.addX(-1)

        for (let num = 0; num < 4; num ++){
            if (num == 3){
                currentPosition = currentPosition.addY(-1)
                currentPosition = currentPosition.addX(-2)
                square = new Square(currentPosition, this.image)
                //square.square.style.visibility ="hidden";
                square.createSquare;
            } else {
                square = new Square(currentPosition, this.image);
               // square.square.style.visibility = "hidden"
                square.createSquare;
                currentPosition = currentPosition.addX(1);
            }
            console.log(square, "current square")
            let squareObject = {currentSquare: square, playable:true};
            this.group.push(squareObject);
        }
        if (this.collision.wallCollision(this.group,"right2")){
            // console.log("adding stuff")
    
             this.changeFirstPosition(position.addX(-1),collisionPoints)
             this.currentPosition = 2;
         }
        
         
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
    }


    changeFirstPosition(position,collisionPoints){

        this.task.emptySquareObjects(this.group);
        this.group = []
        let currentPosition = position;

        let square;
        let xIndex = -1
        let yIndex = 0;

        currentPosition = currentPosition.addX(1)
        currentPosition = currentPosition.addY(-1);

       for (let num  = 0; num < 4; num ++){
           if (num ==3){
                currentPosition = currentPosition.addX(-1);
                currentPosition = currentPosition.addY(-2);
                square = new Square(currentPosition,this.image);
                //square.square.style.visibility = 'hidden';
                square.createSquare;
           } else {
               square = new Square(currentPosition, this.image);
               //square.square.style.visibility = 'hidden';
               square.createSquare;
               currentPosition = currentPosition.addY(1);

           }
           let squareObject = {currentSquare: square, playable:true}
           this.group.push(squareObject);
       }
        console.log(this.group, "this groupp")
        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)

    }


    

    changeDefaultPosition(position,collisionPoints) {

        this.task.emptySquareObjects(this.group);
        this.group = []
        
        let currentPosition = position
        let addNumber = 1
        let square;

        currentPosition = currentPosition.addX(-1)
        currentPosition = currentPosition.addY(1)
        for (let num = 0; num < 4; num ++){
            if (num == 3){
                currentPosition = currentPosition.addX(-2)
                currentPosition = currentPosition.addY(1);
                square = new Square(currentPosition, this.image);
                //square.square.style.visibility = "hidden"
                square.createSquare;


            } else {
                square = new Square(currentPosition, this.image);
                // square.square.style.visibility = "hidden";
                square.createSquare;
                currentPosition = currentPosition.addX(addNumber);


            }
            let squareObject = {currentSquare: square, playable:true}
            this.group.push(squareObject);
        }

        
        if (this.collision.wallCollision(this.group,"left2")){
            // console.log("adding stuff")
            let newPosition = position.addX(-1);
            newPosition = newPosition.addY(1);
             this.changeThirdPosition(newPosition, collisionPoints);
             this.currentPosition = 4;
         }

        if (!this.collision.normalCollision(this, collisionPoints)) this.task.makeTetroVisbile(this.group)
      

    }
}