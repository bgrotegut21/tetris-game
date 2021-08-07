import { Attribute } from "./attributes.js";

export class Square {
    constructor(position,backgroundImage){
        this.position = position;
        this.backgroundImage = backgroundImage;
        this.size = 25;
        this.attribute = new Attribute;
        this.square = document.createElement("div")
    }
    

    get createSquare(){
        let currentXPosition = this.position.xPosition * this.size;
        let currentYPosition = this.position.yPosition * this.size;
        this.square.style.background = `url(${this.backgroundImage})`
        this.square.style.left = currentXPosition + "px";
        this.square.style.top = currentYPosition + "px";
        this.square.setAttribute("class","square");
        this.attribute.grid.appendChild(this.square);

    }

    get moveSquare(){
        let currentXPosition = this.position.xPosition * this.size;
        let currentYPosition = this.position.yPosition * this.size;
        this.square.style.left = currentXPosition + "px";
        this.square.style.top = currentYPosition + "px";
    }
}