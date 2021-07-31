export class Position {
        constructor(xPosition,yPosition){
            this.xPosition = xPosition;
            this.yPosition = yPosition;
        }
        addX (position, incrementXPosition){
            newPosition = position.x + incrementXPosition;
            return new Position(newPosition, position.y);
        }
        addY (position, incrementYPosition){
            newPosition = position.y + incrementYPosition;
            return new Position(position.x, newPosition)
        }
        movePosition (position, newPosition){
            return newPosition;
        }

}