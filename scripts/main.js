import { Attribute } from './attributes.js';
import { Settings } from './settings.js';

import { JTetromino } from './jTetro.js';
import { OTetromino } from './oTetro.js';
import { ZTetromino } from './zTetro.js';
import { TTetromino } from './tTetro.js';
import { ITetromino } from './iTetromino.js';
import { STetromino } from './sTetro.js';
import { LTetromino } from './lTetro.js';

import { Position } from './position.js';
import { Square } from './square.js';
import { Collision } from './collisions.js';

let attribute = new Attribute();
let gameOn = false;
let pausedGame = false;
let lastTime = Date.now();

class Game {
  constructor() {
    this.attribute = new Attribute();

    this.jTetromino = new JTetromino();
    this.oTetromino = new OTetromino();
    this.zTetromino = new ZTetromino();
    this.tTetromino = new TTetromino();
    this.iTetromino = new ITetromino();
    this.sTetromino = new STetromino();
    this.lTetromino = new LTetromino();

    this.tetrominos = [
      this.jTetromino,
      this.oTetromino,
      this.zTetromino,
      this.tTetromino,
      this.iTetromino,
      this.sTetromino,
      this.lTetromino,
    ];
    this.tetro;
    this.tetroMove = false;
    this.settings = new Settings();
    this.nextTetromino;

    this.collisionPoints = [];
    this.bottomWallCollisionOn = true;
    this.positionOfJTetromino;
    this.collision = new Collision();
    this.row = { 0: [] };
    this.yRows;
    this.xRows;
    //  this.canDrop = false
    this.score = this.attribute.scoreNumber;
    this.lines = this.attribute.lineNumber;
    this.defaultPosition = new Position(4, 0);

    this.firstClick = true;
    this.currentScore = 0;
    this.currentLine = 0;
    this.stopAutoDrop = false;
    this.lastTime = Date.now();
  }

  runOnce() {
    this.runKeyEvents();
    this.mouseEvent();
    this.clickEvents();

    this.tetro = this.spawnRandomTetro();
    this.tetro = this.oTetromino;
    this.tetro.changeDefaultPosition(
      this.defaultPosition,
      this.collisionPoints,
      true
    );
    this.tetro.currentPosition = 1;

    this.nextTetromino = this.spawnRandomTetro();
    this.displayRandomTetro(this.nextTetromino);
    this.blackOut(true);
    this.closeSquareImages();
    this.checkMediaQuery();
  }

  closeSquareImages() {
    this.tetrominos.map((tetro) => {
      tetro.squareImage.style.display = 'none';
    });
  }

  displayRandomTetro(tetro) {
    this.closeSquareImages();
    tetro.squareImage.style.display = 'block';
  }

  spawnRandomTetro() {
    let randomIndex = Math.floor(Math.random() * 7);
    return this.tetrominos[randomIndex];
  }

  deleteCollisionPoints(collisionPoints, number) {
    let newCollisionPoints = collisionPoints.filter(
      (squareObject) => squareObject.currentSquare.position.yPosition != number
    );
    return newCollisionPoints;
  }

  moveXPosition(number) {
    this.tetro.group.map((squareObject) => {
      let square = squareObject.currentSquare;
      square.position = square.position.addX(number);
      square.moveSquare;
    });
  }

  moveYPosition(number) {
    this.tetro.group.map((squareObject) => {
      let square = squareObject.currentSquare;
      square.position = square.position.addY(number);
      square.moveSquare;
    });
  }

  checkRows() {
    let numberIndex = 0;
    while (numberIndex != 20) {
      if (
        typeof this.row[String(numberIndex)] != 'undefined' &&
        this.row[String(numberIndex)].length == 10
      ) {
        this.row[String(numberIndex)].map((squareObject) => {
          let square = squareObject.currentSquare.square;
          square.remove();
        });
        this.collisionPoints = this.deleteCollisionPoints(
          this.collisionPoints,
          Number(numberIndex)
        );
        let row = this.collisionPoints.filter(
          (squareObject) =>
            squareObject.currentSquare.position.yPosition == Number(numberIndex)
        );

        this.row[String(numberIndex)] = row;
        this.bringDownBlocks(this.row);
        this.currentLine += 1;
      } else {
        let row = this.collisionPoints.filter(
          (squareObject) =>
            squareObject.currentSquare.position.yPosition == numberIndex
        );
        this.row[String(numberIndex)] = row;
      }
      numberIndex += 1;
    }
  }

  bringDownBlocks(row) {
    let newRow = row;
    let newRowKeys = Object.keys(newRow);
    let highestLength;
    let lowestLength;
    let filteredRow = [];
    let fallingRow = [];
    for (let number of newRowKeys) {
      if (newRow[number].length != 0) {
        highestLength = number;
        break;
      }
    }
    for (let value of newRowKeys) {
      if (value >= Number(highestLength)) filteredRow.push(value);
    }

    for (let number of filteredRow) {
      if (newRow[number].length == 0) {
        lowestLength = number;
        break;
      }
    }
    for (let value of filteredRow) {
      if (value < Number(lowestLength)) fallingRow.push(value);
    }
    this.dropBlocks(fallingRow, newRow);
  }

  dropBlocks(fallingRow, row) {
    fallingRow.map((key) => {
      row[key].map((squareObject) => {
        let square = squareObject.currentSquare;
        square.position = square.position.addY(1);
        square.moveSquare;
      });
    });
    this.updateLines(1);
  }

  checkVericalCollision() {
    if (this.tetro.type == 'lTetromino') {
      if (this.collision.vetricalRowCollision(this.collisionPoints, 2)) {
        if (this.collision.normalCollision(this.tetro, this.collisionPoints)) {
          this.resetGame('Game Over!');
        }
      }
    } else {
      if (this.collision.vetricalRowCollision(this.collisionPoints, 1)) {
        if (this.collision.normalCollision(this.tetro, this.collisionPoints)) {
          this.resetGame('Game Over!');
        }
      }
    }
  }

  addToGrid(tetro) {
    let defaultPosition = new Position(3, 0);
    tetro.group.map((currentTetroObject) => {
      currentTetroObject.playable = false;
      this.collisionPoints.push(currentTetroObject);
    });
    tetro.group = [];

    this.tetro = this.nextTetromino;
    this.nextTetromino = this.spawnRandomTetro();
    this.displayRandomTetro(this.nextTetromino);

    this.tetro.changeDefaultPosition(
      defaultPosition,
      this.collisionPoints,
      true
    );
    this.tetro.currentPosition = 1;
    this.checkVericalCollision();

    this.updateScore(18);
  }

  updateScore(number) {
    this.currentScore = Number(this.currentScore) + number;
    if (
      this.currentScore >= 10000 &&
      !/\d+\.\d+e\+\d+/.test(String(this.currentScore))
    )
      this.currentScore = this.currentScore.toExponential(2);
  }

  updateLines(number) {
    this.currentLine = Number(this.currentLine) + number;
    if (
      this.currentScore >= 10000 &&
      !/\d+\.\d+e\+\d+/.test(String(this.currentScore))
    )
      this.currentScore = this.currentScore.toExponential(2);
  }

  mouseEvent() {
    let allowtoMove = false;
    let recordedPosition;
    let yRecordedPosition;

    window.addEventListener('touchstart', (action) => {
      if (!gameOn) return;
      let touchEvent = action.changedTouches[0];
      recordedPosition = Math.floor(touchEvent.clientX);
      yRecordedPosition = Math.floor(touchEvent.clientY);

      allowtoMove = true;
    });

    window.addEventListener('click', () => {
      if (gameOn) {
        if (this.firstClick) this.firstClick = false;
        else
          this.tetro.changePlacement(
            this.tetro.group[0].currentSquare.position,
            this.collisionPoints
          );
      }
    });

    window.addEventListener(
      'touchmove',
      (action) => {
        if (!allowtoMove) return;
        this.tetro.stopMovement = false;
        let touchEvent = action.changedTouches[0];
        if (
          Math.floor(touchEvent.clientX) > recordedPosition &&
          (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0
        ) {
          this.rightMovement();
          recordedPosition = Math.floor(touchEvent.clientX);
        }
        if (
          Math.floor(touchEvent.clientX) < recordedPosition &&
          (Math.floor(touchEvent.clientX) - recordedPosition) % 10 == 0
        ) {
          this.leftMovment();
          recordedPosition = Math.floor(touchEvent.clientX);
        }
        if (
          Math.floor(touchEvent.clientY) > yRecordedPosition &&
          (Math.floor(touchEvent.clientY) - yRecordedPosition) % 10 == 0
        ) {
          this.downMovement();
          yRecordedPosition = Math.floor(touchEvent.clientY);
        }
      },
      { passive: true }
    );
    window.addEventListener('touchend', () => {
      allowtoMove = false;
    });
  }

  checkZTetro(tetro) {
    if (tetro.currentPosition == 2) {
      return true;
    }
  }

  checkJTetro(tetro) {
    if (tetro.currentPosition == 2) {
      return true;
    }
  }

  checkType(tetro) {
    if (tetro.type == 'zTetromino') {
      if (this.checkZTetro(tetro)) return true;
    }
    if (tetro.type == 'jTetromino') {
      if (this.checkJTetro(tetro)) return true;
    }
  }

  startGame() {
    gameOn = true;
    this.blackOut(false);
    this.attribute.modeText.style.display = 'none';
    this.nextTetromino.squareImage.style.display = 'block';
    this.firstClick = true;
    this.lastTime = Date.now();
    startTimer();
  }

  clickEvents() {
    this.attribute.modeText.addEventListener('click', () => {
      if (this.attribute.modeText.textContent == 'Play') {
        this.startGame();
      }
      if (this.attribute.modeText.textContent == 'Game Over!') {
        this.startGame();
      }
      if (this.attribute.modeText.textContent == 'Paused') {
        this.startGame();
      }
    });

    this.attribute.pasueButton.addEventListener('click', () => {
      if (gameOn) {
        this.closeSquareImages();
        this.attribute.modeText.textContent = 'Paused';
        this.attribute.modeText.style.display = 'block';
        this.firstClick = true;
        gameOn = false;
        this.blackOut(true);
        startTimer();
      } else {
        this.nextTetromino.squareImage.style.display = 'block';
        this.startGame();
      }
    });
    this.attribute.quitButton.addEventListener('click', () => {
      this.resetGame('Play');
    });
  }

  rightMovement() {
    if (
      this.collision.wallCollision(
        this.tetro.group,
        'right',
        this.tetro.currentPosition
      )
    )
      return;
    if (
      this.collision.squareCollision(this.tetro, this.collisionPoints, 'right')
    )
      return;
    if (gameOn) this.moveXPosition(1);
  }

  leftMovment() {
    if (this.collision.wallCollision(this.tetro.group, 'left')) return;
    if (
      this.collision.squareCollision(this.tetro, this.collisionPoints, 'left')
    )
      return;
    if (gameOn) this.moveXPosition(-1);
  }

  downMovement() {
    if (this.collision.wallCollision(this.tetro.group, 'bottom')) return;
    if (gameOn) this.moveYPosition(1);
  }

  runKeyEvents() {
    window.addEventListener('keydown', (action) => {
      if (action.key == 'ArrowRight') {
        this.rightMovement();
      }
      if (action.key == 'ArrowLeft') {
        this.leftMovment();
      }
      if (action.key == 'ArrowDown') {
        this.downMovement();
      }
      if (action.key == 'ArrowUp') {
        if (gameOn) {
          this.tetro.changePlacement(
            this.tetro.group[0].currentSquare.position,
            this.collisionPoints
          );
        }
      }
      action.preventDefault();
    });
  }

  updateStats() {
    this.score.textContent = this.currentScore;
    this.lines.textContent = this.currentLine;
  }

  createYRows() {
    let index = 0;
    let rows = { 0: [] };
    while (index != 20) {
      let filteredYRow = this.collisionPoints.filter(
        (squareObject) => squareObject.currentSquare.position.yPosition == index
      );
      rows[String(index)] = filteredYRow;
      if (filteredYRow.length == 0) rows[String(index)] = ['empty'];
      index++;
    }
    return rows;
  }

  checkMediaQuery() {
    let minWidth = window.matchMedia('(max-width:320px)');
    if (minWidth.matches) this.resizeSquares();
    if (!minWidth.matches) this.enlargeSquares();
  }

  resizeSquares() {
    this.tetro.reduceSize = true;
    this.collisionPoints.map((squareObject) => {
      let square = squareObject.currentSquare;
      square.reduceSquareSize;
    });
    this.tetro.group.map((tetroObject) => {
      let square = tetroObject.currentSquare;
      square.reduceSquareSize;
    });
  }

  enlargeSquares() {
    this.tetro.reduceSize = false;
    this.collisionPoints.map((squareObject) => {
      let square = squareObject.currentSquare;
      square.enlargeSize;
    });

    this.tetro.group.map((tetroObject) => {
      let square = tetroObject.currentSquare;
      square.enlargeSize;
    });
  }

  createXRows() {
    let index = 0;
    let rows = { 0: [] };
    while (index != 10) {
      let filteredYRow = this.collisionPoints.filter(
        (squareObject) => squareObject.currentSquare.position.xPosition == index
      );
      rows[String(index)] = filteredYRow;
      index++;
    }
    return rows;
  }

  resetBoard() {
    this.collisionPoints.map((squareObject) => {
      squareObject.currentSquare.square.remove();
    });
    this.collisionPoints = [];
  }

  removeAllSquares() {
    let currentSquare = document.querySelectorAll('.square');
    for (let square of currentSquare) {
      square.remove();
    }
  }

  blackOut(bool) {
    let currentSquare = document.querySelectorAll('.square');
    if (bool) {
      for (let square of currentSquare) {
        square.style.display = 'none';
      }
    } else {
      for (let square of currentSquare) {
        square.style.display = 'block';
      }
    }
  }

  resetGame(message) {
    this.attribute.modeText.textContent = message;
    this.attribute.modeText.style.display = 'block';
    this.closeSquareImages();
    this.currentScore = 0;
    this.currentLine = 0;
    this.updateStats();
    this.resetBoard();
    this.removeAllSquares();
    this.tetro = this.spawnRandomTetro();
    this.tetro.changeDefaultPosition(
      this.defaultPosition,
      this.collisionPoints,
      true
    );
    this.nextTetromino = this.spawnRandomTetro();

    this.blackOut(true);

    gameOn = false;
  }

  autoDropBlock() {
    let currentTime = Date.now();
    if (currentTime - this.lastTime >= 500) {
      this.lastTime = currentTime;
      this.moveYPosition(1);
    }
  }

  runGame() {
    this.yRows = this.createYRows();
    this.xRows = this.createXRows();

    if (
      this.collision.levelCollision(
        this.tetro,
        this.xRows,
        this.collisionPoints
      )
    )
      this.addToGrid(this.tetro);

    if (this.collision.fartherBottomCollision(this.tetro)) {
      this.tetro.reversePlacement(
        this.tetro.group[0].currentSquare.position,
        this.collisionPoints
      );
    } else {
      if (this.collision.wallCollision(this.tetro.group, 'bottom'))
        this.addToGrid(this.tetro);
    }

    if (this.collision.vetricalRowCollision(this.collisionPoints))
      this.resetGame('Game Over!');

    this.collision.detectCollision(this.tetro, this.collisionPoints);
    this.updateStats();
    this.checkMediaQuery();
    this.checkRows();
    this.autoDropBlock();
  }
}

let game = new Game();

game.runOnce();
function startTimer() {
  let timer = setInterval(() => {
    if (!gameOn) clearInterval(timer);
    let currentTime = Date.now();
    if (currentTime - lastTime >= 1) {
      lastTime = Date.now();
      game.runGame();
    }
  }, 1);
}
