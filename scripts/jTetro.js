
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
        this.canMove = true


    }



//Different positions
// |_    -|        |_      --|
// 1     2         3        4

    



    changePosition(position){
        this.moveFirstPosition(position);
        //this.moveDefaultPosition(position);

            
    }

    moveFirstPosition(position){
        let index = 1;
        let second = "second";
        let secondIndex = 0;
        for (let square of this.group){
            if (second) {
                index = 2
                square.style.left = position.xPosition + this.sizeX * index + "px";
                second = false;
               

            } else {
                index = 1;
                console.log(second)
                
                square.style.left = position.xPosition + this.sizeX * index + "px";
                if(second == "second") second = true;
            }
            square.style.top = position.yPosition + this.sizeY * secondIndex + "px";
            secondIndex +=1;
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

        console.log(this.currentPosition)
        this.canMove = false;
        if(this.currentPosition == 0) this.changeDefaultPosition();
        if (this.currentPosition == 1) this.changeFirstPosition();
        if (this.currentPosition == 1) this.currentPosition = 0;
        else this.currentPosition += 1;


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

   
    }



}