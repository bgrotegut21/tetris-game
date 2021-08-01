
import { Attribute } from "./attributes.js";


export class JTetromino {
    constructor(position){
        this.attribute = new Attribute;
        this.image = "images/blueTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.position = position;
        this.squres = 4;
        this.group = []

    }

    changePosition(position){
        console.log(this.position)
        this.group.map(square => {
            square.style.top = position.yPosition + "px";
            square.style.left = position.xPosition + "px";
        })
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
    moveSquares(canMove){
        if (canMove) {
            newPosition = this.position.addX(this.position,25)
            this.changePosition(newPosition);
            canMove = false;
        } 
    }


}