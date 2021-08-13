
export class TetroTask {
    emptySquareObjects(group){
        for(let squareObject of group){
            let squareClass = squareObject.currentSquare;
            squareClass.square.remove();
        }
    }

}