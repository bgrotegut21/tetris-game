export class Collision {

    wallCollision(tetrogroup,direction){
        let restrictMovement = false;
    

        for (let squareObject of tetrogroup){
            let square = squareObject.currentSquare;
            if (direction == "right"){

                if (square.position.xPosition > 8){
                    console.log("collision")
                    restrictMovement = true
                    break
                } else {
                    restrictMovement = false;
                }
            }
            if (direction == "right2"){

                if (square.position.xPosition > 9){
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

            if (direction == "left2"){
                if (square.position.xPosition < 0){
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

    rightCollision(tetroSquare,square){
        let restrictMovement = false;
        if (tetroSquare.position.xPosition == square.position.xPosition -1   ) restrictMovement = true;
        return restrictMovement;
    }

    leftCollision(tetroSquare,square){
        let restrictMovement = false;
        if (tetroSquare.position.xPosition == square.position.xPosition +1   ) restrictMovement = true;
        return restrictMovement;
    }

    bototmCollision(tetro, collisionPoints){
        for (let tetroObject of tetro.group){
            let tetroSquare = tetroObject.currentSquare;
            for (let squareObject of collisionPoints){
                let square = squareObject.currentSquare;
                if (tetroSquare.position.yPosition == square.position.yPosition -1){
                    if(tetroSquare.position.xPosition == square.position.xPosition ){
                        return true;
                    }
                }
            }
        }
    }


    

    squareCollision(tetro, collisionPoints,direction){

        let restrictMovement = false
        for (let tetroObject of tetro.group){
            let tetroSquare = tetroObject.currentSquare;
            for (let squareObject of collisionPoints){
                let square = squareObject.currentSquare;
                if (tetroSquare.position.yPosition == square.position.yPosition ){

                    
                    if (direction == "right") {
                        if (this.rightCollision(tetroSquare,square)){
                            restrictMovement = true;
                            break
                        }
                    }
                    if (direction == "left"){
                        if (this.leftCollision(tetroSquare,square)){
                            restrictMovement = true;
                            break;
                        }
                    }
        
                }
                
            }
        }
        return restrictMovement;
    } 
}
