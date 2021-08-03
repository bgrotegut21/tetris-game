
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
        currentPosition = 0;

    }



//Different positions
// |_    -|        |_      --|
// 1     2         3        4

    changeArrangement(){
        this.group.map(square => {
            square.remove()
        })

        for (let i = 0; i <4, i++ ){
            square = document.createElement("div");
            square.setAttribute("class","square")
        }

    }


    changePosition(position){
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



    createTetromino() {
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