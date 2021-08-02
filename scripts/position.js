export class Position {
        constructor(xPosition,yPosition){
            this.xPosition = xPosition;
            this.yPosition = yPosition;
        }
        addX (incrementXPosition){
            let newPosition = this.xPosition + incrementXPosition;
            return new Position(newPosition, this.yPosition);
        }
        addY (incrementYPosition){
            let newPosition = this.yPosition + incrementYPosition;
            return new Position(this.xPosition, newPosition)
        }
    }