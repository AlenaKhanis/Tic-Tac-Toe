"use strict";


const canvasSize = 600;
const cellSize = canvasSize / 3;
const padding = cellSize / 10;

class TicTacToe {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.currentPlayer = document.getElementById("currentplayer");
    this.winnerBox = document.getElementById("winner");
    this.log = document.getElementById("log");
    this.gameOver = false;
    this.resetGame();
    this.canvas.addEventListener("click", (event) => this.handleClick(event));
  }

  resetGame(event) {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 5;

    // The board
    this.ctx.beginPath();
    this.ctx.moveTo(cellSize, 0);
    this.ctx.lineTo(cellSize, this.canvas.height);
    this.ctx.moveTo(cellSize * 2, 0);
    this.ctx.lineTo(cellSize * 2, this.canvas.height);
    this.ctx.moveTo(0, cellSize);
    this.ctx.lineTo(this.canvas.width, cellSize);
    this.ctx.moveTo(0, cellSize * 2);
    this.ctx.lineTo(this.canvas.width, cellSize * 2);
    this.ctx.stroke();

    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.currentPlayer.innerText = "X";
    this.winnerBox.innerText = " ";
    this.gameOver = false;

    // Start the game with the human player
    this.humanPlayerTurn = true;
  }

  drawX(x, y) {
    let boxX = cellSize * x;
    let boxY = cellSize * y;

    this.ctx.strokeStyle = "rgb(226, 134, 48)";
    this.ctx.lineWidth = 10;

    this.ctx.beginPath();

    this.ctx.moveTo(padding + boxX, padding + boxY);
    this.ctx.lineTo(cellSize - padding + boxX, cellSize - padding + boxY);
    this.ctx.moveTo(padding + boxX, cellSize - padding + boxY);
    this.ctx.lineTo(cellSize - padding + boxX, padding + boxY);

    this.ctx.stroke();
  }

  drawO(x, y) {
    let boxX = cellSize * x;
    let boxY = cellSize * y;

    this.ctx.strokeStyle = "#52aab6";
    this.ctx.lineWidth = 10;

    this.ctx.beginPath();
    this.ctx.arc(
      cellSize / 2 + boxX,
      cellSize / 2 + boxY,
      cellSize / 2 - padding,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
  }

  computerMove() {
    if (this.gameOver || this.humanPlayerTurn) return;
    
    let computerRow, computerCol;
    do {
      computerRow = Math.floor(Math.random() * 3); 
      computerCol = Math.floor(Math.random() * 3);
    } while (this.board[computerRow][computerCol] !== "");

    // Make the computer's move
    this.board[computerRow][computerCol] = "O";
    this.drawO(computerCol, computerRow);

    // Check for a win or draw
    let wins = this.winCheck();
    if (wins === "O") {
      this.gameOver = true;
      this.winnerBox.innerText = "Computer wins";
    } else if (wins === "Draw") {
      this.gameOver = true;
      this.winnerBox.innerText = "Draw";
    }

    // Change the current player back to the human player
    this.currentPlayer.innerText = "X";
    this.humanPlayerTurn = true;
  }

  handleClick(event) {
    if (this.gameOver) return;

    let mouseX = Math.floor(event.offsetX / cellSize);
    let mouseY = Math.floor(event.offsetY / cellSize);

    if (this.board[mouseY][mouseX] !== "") {
      return;
    }

    if (this.humanPlayerTurn) {
      this.board[mouseY][mouseX] = "X";
      this.drawX(mouseX, mouseY);

      // Check for a win or draw
      let wins = this.winCheck();
      if (wins === "X") {
        this.gameOver = true;
        this.winnerBox.innerText = "Human Player wins";
      } else if (wins === "Draw") {
        this.gameOver = true;
        this.winnerBox.innerText = "Draw";
      }

      // Change the current player to the computer
      this.currentPlayer.innerText = "Computer (O)";
      this.humanPlayerTurn = false;

      // Call computerMove to make the computer's move
      this.computerMove();
    }
  }

  winCheck() {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== ""
      ) {
        return this.board[i][0];
      }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
      if (
        this.board[0][j] === this.board[1][j] &&
        this.board[1][j] === this.board[2][j] &&
        this.board[0][j] !== ""
      ) {
        return this.board[0][j];
      }
    }

    // Check diagonals
    if (
      (this.board[0][0] === this.board[1][1] &&
        this.board[1][1] === this.board[2][2] &&
        this.board[0][0] !== "") ||
      (this.board[0][2] === this.board[1][1] &&
        this.board[1][1] === this.board[2][0] &&
        this.board[0][2] !== "")
    ) {
      return this.board[1][1];
    }

    // Check for a draw
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === "") {
          return "";
        }
      }
    }

    return "Draw";
  }
}

window.addEventListener("load", () => {
  let canvas = document.getElementById("my_canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  let game = new TicTacToe(canvas);
  document
    .getElementById("reset")
    .addEventListener("click", (event) => game.resetGame(event));
});
