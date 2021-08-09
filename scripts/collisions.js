export class Collision {
    wallCollision(tetrogroup,direction){
        let restrictMovement = false;
        console.log(direction)
        for (let squareObject of tetrogroup){
            let square = squareObject.currentSquare;
            if (direction == "right"){
                if (square.position.xPosition > 10){
                    restrictMovement = true
                    break
                } else {
                    restrictMovement = false;
                }
            }
        }
        return restrictMovement;
    }

}