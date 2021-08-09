export class Collision {
    wallCollision(tetrogroup,direction){
        let restrictMovement = false;
        for (let squareObject of tetrogroup){
            let square = squareObject.currentSquare;
            if (direction == "right"){

                if (square.position.xPosition > 8){
                    restrictMovement = true
                    break
                } else {
                    restrictMovement = false;
                }
            }
            if (direction == "left"){
                if (square.position.xPosition < 1){
                    restrictMovement = true;
                    break
                } else {
                    restrictMovement = false;
                }
            } 


            if (direction == "bottom"){
                if (square.position.yPosition > 18){
                    restrictMovement = true;
                    break
                } else {
                    restrictMovement = false;
                }
            } 

            
        }
        return restrictMovement;
    }

    rightCollision(tetroSquare,square,position){


        console.log(position, "position")
        let restrictMovement = false;
        let difference;
        if (position == 1) difference = 4;
        if (position == 2) difference = 2

        if (tetroSquare.position.xPosition +difference > square.position.xPosition  ){
                restrictMovement = true;
        }
        return restrictMovement;
    }


    squareCollision(tetrogroup, collisionPoints,direction,position){

        let restrictMovement = false
        for (let tetroObject of tetrogroup){
            let tetroSquare = tetroObject.currentSquare;
            for (let squareObject of collisionPoints){
                let square = squareObject.currentSquare;
                if (tetroSquare.position.yPosition > square.position.yPosition -2){
                    if (direction == "right") restrictMovement =  this.rightCollision(tetroSquare,square,position);
                }
                
            }
        }
        return restrictMovement;
    }

}