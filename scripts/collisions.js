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
                //console.log("collision")
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

    getHeights (xRows){
        let xKeys = Object.keys(xRows);
        let index = 0;
        let heights = [];
        let currentHeights = []

        xKeys.map(key => xRows[key] = this.getEmptyRows(xRows[key]));


        xKeys.map(key => {
            let index =0;
            while (index != 20){
              //  console.log(key, "current key ")
                if (xRows[key][index] != "empty"){
                    let square = xRows[key][index];
                    let coordinates = {xCoord: square.position.xPosition, yCoord: square.position.yPosition};
                    //console.log(coordinates, "coordinates");
                    currentHeights.push(coordinates);
                   // console.log(currentHeights, "current heighs")
                } else if(xRows[key][index] == "empty"){
                  //  console.log(currentHeights, "current heights")
                    let numbers = [];
                
                    currentHeights.map(coordinates => {
                        numbers.push(coordinates.yCoord);
                     
                    })
                    
                    let leastNumber = numbers.sort((a,b) => a-b);
                    if(currentHeights.length != 0){
                    //    console.log(currentHeights, "current heights")
                     //   if(currentHeights[0].yCoord == 9) console.log(currentHeights[0])
                        let coordinates = {xCoord:currentHeights[0].xCoord, yCoord:leastNumber[0]}
                        heights.push(coordinates);
                        

                  }
                    currentHeights = [];
                    
                  //  console.log(coordinates, "coordinates")
                   // console.log(currentHeights.length, "current heights length")
                  // console.log(key, "key")
                 // console.log(currentHeights, "current heights")
                    
                } 
                index ++;
                //console.log(currentHeights, "current heigths")
            
            }
            let numbers = [];
                
            currentHeights.map(coordinates => {
                numbers.push(coordinates.yCoord);
             
            })
            
            let leastNumber = numbers.sort((a,b) => a-b);
            if(currentHeights.length != 0){
            //    console.log(currentHeights, "current heights")
                if(currentHeights[0].yCoord == 9) console.log(currentHeights[0])
                let coordinates = {xCoord:currentHeights[0].xCoord, yCoord:leastNumber[0]}
                heights.push(coordinates);
                

          }
            currentHeights = []; 
            

        })
       return heights;


    }


    levelCollision(tetro,xRows,collisionPoints){
    if (this.normalCollision(tetro, collisionPoints)) return;    
    let heights = this.getHeights(xRows);
      for (let coordinates of  heights){
          for (let squareObject of tetro.group){
              let square = squareObject.currentSquare;
              if (square.position.yPosition == coordinates.yCoord -1){
                  if (square.position.xPosition == coordinates.xCoord){
                      return true;
                  }
              }
          }
      }
    }


    showVisbility(tetro){
        tetro.group.map(squareObject => {
            let currentSquare = squareObject.currentSquare;
            currentSquare.square.style.visibility = "hid"
        })
    }

    normalCollision(tetro,collisionPoints){
    //    console.log(collisionPoints)
        for (let squareObject of collisionPoints){
            let square = squareObject.currentSquare;

            for(let tetroObject of tetro.group){
                let tetroSquare = tetroObject.currentSquare;
                if(square.position.yPosition == tetroSquare.position.yPosition && 
                   square.position.xPosition == tetroSquare.position.xPosition){  
                    return true;
                } 
            }
        }
    }

    vetricalRowCollision(collisionPoints,number){
        let comparisonNumber;
        if (typeof number == "undefined") comparisonNumber =0;
        else comparisonNumber = number;
        //console.log(collisionPoints, "collision points")
        for (let squareObject of collisionPoints){
            let square = squareObject.currentSquare;
            
            if (square.position.yPosition == comparisonNumber){
                console.log(square.position.xPosition, "square x position")
                return true
            }
        }
    }



    detectCollision(tetro,collisionPoints){
        if (this.normalCollision(tetro,collisionPoints)){
            tetro.reversePlacement(tetro.group[0].currentSquare.position,collisionPoints)
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
                        } else {
                            tetro.restrictPosition = false;
                        }
                    }
                    if (direction == "left"){
                        if (this.leftCollision(tetroSquare,square)){
                           // console.log("left collision")
                           
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
