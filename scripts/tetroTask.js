
export class TetroTask {
    emptySquareObjects(group){
        for(let squareObject of group){
            let squareClass = squareObject.currentSquare;
            squareClass.square.remove();
        }
    }

    makeTetroVisbile(group){
        group.map(squareObject => {
            let currentSquare = squareObject.currentSquare;
            currentSquare.square.style.visibility = "visible"
        })
    }



}