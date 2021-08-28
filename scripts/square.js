import { Attribute } from "./attributes.js";

export class Square {
    constructor(position,backgroundImage){
        this.position = position;
        this.backgroundImage = backgroundImage;
        this.size = 25;
        this.smallerSize = 12.5;
        this.attribute = new Attribute;
        this.square = document.createElement("div")
        this.isReduction = false;
    }
    

    get createSquare(){
        let size = this.size;
        if (this.isReduction) size = this.smallerSize;
        let currentXPosition = this.position.xPosition * size;
        let currentYPosition = this.position.yPosition * size;
        this.square.style.background = `url(${this.backgroundImage})`
        this.square.style.left = currentXPosition + "px";
        this.square.style.top = currentYPosition + "px";
        this.square.setAttribute("class","square");
        this.attribute.grid.appendChild(this.square);
    }

    get moveSquare(){
        let size = this.size;
        if(this.isReduction) size = this.smallerSize;
        let currentXPosition = this.position.xPosition * size;
        let currentYPosition = this.position.yPosition * size;

        this.square.style.left = currentXPosition + "px";
        this.square.style.top = currentYPosition + "px";
    }

    get reduceSquareSize (){
        this.isReduction = true;
        let currentXPosition = this.position.xPosition * this.smallerSize;
        let currentYPosition = this.position.yPosition * this.smallerSize;

        this.square.style.left  = currentXPosition + "px";
        this.square.style.top = currentYPosition + "px";

        this.square.style.height = this.smallerSize + "px";
        this.square.style.width = this.smallerSize + "px";
    }

    get enlargeSize (){
        this.isReduction = false;
        let currentXPosition = this.position.xPosition * this.size;
        let currentYPosition = this.position.yPosition * this.size;
        
        this.square.style.left = currentXPosition + "px";
        this.square.style.top = currentYPosition + "px";

        this.square.style.height = this.size + "px";
        this.square.style.width = this.size + "px"
    }
}