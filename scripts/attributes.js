export function Attribute (){
    this.grid = document.querySelector(".grid");
    this.modeText = document.querySelector(".mode-text");

    this.iTetrominoImage = document.querySelector(".iTetromino-image");
    this.zTetrominoImage = document.querySelector(".zTetromino-image");
    this.sTetrominoImage = document.querySelector(".sTetromino-Image");
    this.tTetromino = document.querySelector(".tTetromino-image");
    this.jTetromino = document.querySelector(".jTetromino-image");
    this.oTetromino = document.querySelector(".oTetromino-image");
    this.lTetromino = document.querySelector(".lTetromino-image");

    this.scoreNumber = document.querySelector(".score-number");
    this.lineNumber = document.querySelector(".line-number");

    this.pasueButton = document.querySelector(".pause");
    this.quitButton = document.querySelector(".quit")
}