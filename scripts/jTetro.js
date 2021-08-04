
import { Attribute } from "./attributes.js";
import { Position } from "./position.js";




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
        this.currentPosition = 0;
        this.stopMovement = false;  
        this.movement = "";


    }



//Different positions
// |_    -|        |_      --|
// 1     2         3        4

    



    changePosition(position){
        if(this.stopMovement) return;
        this.moveDefaultPosition(position);
            
    }

    moveFirstPosition(position){

        let index = 1;
        let second = "second";
        let secondIndex = 0;
        for (let square of this.group){
            if (second) {
                index = 2
                square.style.left = position.xPosition + this.sizeX * index + "px";
                square.style.top = position.yPosition + this.sizeY * secondIndex + "px"
                second = false;
               

            } else {
                index = 1;
                console.log(second)
                square.style.left = position.xPosition + this.sizeX * index + "px";
                square.style.top = position.yPosition + this.sizeY * secondIndex + "px"
                if(second == "second") second = true;
                secondIndex += 1
                
            }
        }

    }

    moveDefaultPosition(position){
        this.position = position
        let index = 1;
        let first = true;
        for (let square of this.group){
            if (first){
                square.style.left = position.xPosition + this.sizeX *index + "px";
                square.style.top = position.yPosition + "px"
                first = false
            } else {
                square.style.left = position.xPosition + this.sizeX *index + "px";
                square.style.top = position.yPosition + this.sizeY + "px"
                index+= 1;
            }
            
         }

    }

    changePlacement(){
        this.stopMovement = true
        console.log(this.currentPosition)
        if (this.currentPosition == 1) this.currentPosition = 0;
        else this.currentPosition += 1
        if(this.currentPosition == 0) {
            this.changeDefaultPosition();
            this.movement = "default";
        }
        if (this.currentPosition == 1){
            this.changeFirstPosition();
            this.movement = "first";
        }



    }

    changeFirstPosition(){
        this.group.map(square => square.remove());
        let first = true;
        let sizeXposition = 0;
        let sizeYPosition = 0;
        let square;
        for (let i = 0; i <4; i++){
            if (first){
                square = document.createElement("div");
                square.setAttribute("class","square");
                square.style.background = `url(${this.image})`
                square.style.left = this.sizeX * sizeXposition + "px";
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
            this.group.push(square)
        }
        this.stopMovement = false;

    }



  

    changeDefaultPosition() {

        this.group.map(square => square.remove());
        let first = true;
        let size = 0;
        let square
        for (let i = 0; i <4; i ++){
            if(first){
                square = document.createElement("div")
                square.setAttribute("class","square");
                square.style.background = `url(${this.image})`
                square.style.left = this.sizeX * size + "px";
                this.attribute.grid.appendChild(square);
                first = false;
                
            } else {
                square = document.createElement("div");
                square.setAttribute("class","square");
                square.style.background = `url(${this.image})`;
                square.style.left = this.sizeX* size + "px";
                square.style.top = this.sizeY + "px";
                this.attribute.grid.appendChild(square);
                size += 1;
            }
            this.group.push(square)
            
        }
        this.changePosition(this.position)


        this.stopMovement = false;
    }



}