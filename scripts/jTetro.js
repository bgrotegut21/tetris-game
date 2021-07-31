import { Position } from "./position";
import { Attribute } from "./attributes";


export class JTetromino {
    constructor(position){
        this.attribute = new Attribute;
        this.image = "images/blueTetromino.svg"
        this.sizeX = 25;
        this.sizeY  = 25;
        this.pos = position;
        this.squres = 4;

    }
    createTetromino() {
        let first
        for (let i = 0; i <4; i ++){
            let square = document.createElement("div")
            square.setAttribute("class","square");
            square.style.background = `url(${this.image})`
            this.attribute.grid.appendChild(square);
    
        }

    }

}