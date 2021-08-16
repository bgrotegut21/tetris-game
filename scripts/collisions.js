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

    getEmptyRows(array){
        let index = 0;
        let addEmptySpace = false;
        //console.log(array, "array")
        let arrayEmptySpace = {0:"empty"}
        let arrayKeys

        while(index != 20){
            arrayEmptySpace[String(index)] = "empty";
            index ++;
        }
        index = 0;
        
        while (index != 20){
            array.map(squareObject => {
                let square = squareObject.currentSquare;

                if (square.position.yPosition == index){
                    arrayEmptySpace[String(index)] = square;
                }
            })
            index ++;
        }


        


        return arrayEmptySpace;
    }

    levelCollision(tetro,xRows){

        let xKeys = Object.keys(xRows);
        let index = 0;
        let heights = [];
        let currentHeights = []

        xKeys.map(key => xRows[key] = this.getEmptyRows(xRows[key]));

    

        xKeys.map(key => {
            let index =0;
            while (index != 20){
            
                if (xRows[key][index] != "empty"){
                    let square = xRows[key][index];
                    let coordinates = {xCoord: square.position.xPosition, yCoord: square.position.yPosition};
                    currentHeights.push(coordinates);
                   // console.log(currentHeights, "current heighs")
                } else if(xRows[key][index] == "empty"){
                    console.log(currentHeights, "current heights")
                    let numbers = [];
                
                    currentHeights.map(coordinates => {
                        numbers.push(coordinates.yCoord);
                    })
                    let leastNumber = numbers.sort((a,b) => a-b);
                    let coordinates = {xCoord:key, yCoord: leastNumber[0]}
                    //console.log(currentHeights.length, "current heights length")
                    if (currentHeights.length != 0) heights.push(coordinates)
                    
                }
                index ++;
               // console.log(currentHeights, "current heigths")
            }
        })
        
        
        //console.log(heights)

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
                        } else {
                            tetro.restrictPosition = false;
                        }
                    }
                    if (direction == "left"){
                        if (this.leftCollision(tetroSquare,square)){
                            console.log("left collision")
                           
                            restrictMovement = true;
                            break;
                        } else {
                            tetro.restrictPosition = false;
                        }
                    }
        
                }
                
            }
        }
        return restrictMovement;
    } 
}
