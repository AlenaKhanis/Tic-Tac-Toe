"use strict";


const canvasSize = 600;
const cellSize = canvasSize / 3;
const padding = cellSize / 10;


class TicTacToe {
    constructor(canvas) {

       this.canvas =  canvas;
       this.ctx = this.canvas.getContext("2d");
       this.currentPlayer = document.getElementById("currentplayer");
       this.winnerBox = document.getElementById("winner");
       this.gameOver = false;
       this.resetGame();
       this.canvas.addEventListener("click", (event) => this.handleClick(event));
       
       
    }

    resetGame(event) {

        
        this.ctx.fillRect(0 , 0 ,this.canvas.width , this.canvas.height );
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 5;

        // The board
        this.ctx.beginPath();
        // 1 |
        this.ctx.moveTo(cellSize , 0);
        this.ctx.lineTo( cellSize , this.canvas.height);
        // 2 |
        this.ctx.moveTo(cellSize * 2 ,0);
        this.ctx.lineTo(cellSize * 2 , this.canvas.height);
        // 1 ---
        this.ctx.moveTo( 0 , cellSize);
        this.ctx.lineTo( this.canvas.width , cellSize);
        // 2 ---
        this.ctx.moveTo( 0 , cellSize * 2);
        this.ctx.lineTo( this.canvas.width, cellSize * 2);
        this.ctx.stroke();
        // The X 
    
        this.board = [
            ["" , "" , ""],
            ["" , "" , ""],
            ["" , "" , ""],
        ];
        
        this.currentPlayer.innerText = "X"; 
        this.winnerBox.innerText = " ";
        this.gameOver = false;
       
    }

    drawX(x, y) {
        let boxX = cellSize * x;
        let boxY = cellSize * y;
    
        // Set X style
        this.ctx.strokeStyle = "rgb(226, 134, 48)"; // You can choose your desired color
        this.ctx.lineWidth = 10; // Adjust line width as needed
    
        this.ctx.beginPath();
    
        // Draw X
        this.ctx.moveTo(padding + boxX, padding + boxY);
        this.ctx.lineTo(cellSize - padding + boxX, cellSize - padding + boxY);
        this.ctx.moveTo(padding + boxX, cellSize - padding + boxY);
        this.ctx.lineTo(cellSize - padding + boxX, padding + boxY);
    
        this.ctx.stroke();
        
    }
    
    
    drawO(x,y){
    
        let boxX = cellSize * x;
        let boxY = cellSize * y; 

        this.ctx.strokeStyle = "#52aab6"; // Set stroke color to blue
        this.ctx.lineWidth = 10; 
        
    
        this.ctx.beginPath();
        this.ctx.arc(cellSize / 2 + boxX  , cellSize / 2 + boxY , cellSize / 2 - padding , 0 ,Math.PI * 2);
        this.ctx.stroke();

    }

    handleClick(event) {
        
        if (this.gameOver) return;
        let mouseX = Math.floor(event.offsetX /  cellSize);
        let mouseY = Math.floor(event.offsetY / cellSize);
        console.log("y:", event.offsetY);
        console.log("x:" ,event.offsetX);
        // console.log(cellSize); == 200

        
        if (this.board[mouseY][mouseX] != "") {
            return;
        } 

        this.board[mouseY][mouseX] = this.currentPlayer.innerText;
        console.log("boARD: ",this.board[mouseY][mouseX]);
        for (let i=0 ; i<3; i++){
            for(let j=0; j<3; j++) {
               if (this.board[i][j] == "X") {
                    this.drawX(j , i);
               } else if (this.board[i][j] == "O") {
                    this.drawO(j ,i);
               }
            }
        }
        
        if (this.currentPlayer.innerText == "X") {
            
            this.currentPlayer.innerText = "O";
        } else {
        
            this.currentPlayer.innerText = "X";
        }
        

        let wins = this.winCheck();
        if (wins == "X" || wins == "O") {
            this.gameOver = true;
            this.winnerBox.innerText = wins + " wins";
        } else if (wins == "Draw") {
            this.winnerBox.innerText = "Draw";
        }
        
    }

    winCheck() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== "") {
                return this.board[i][0]; // Player X or O wins
            }
        }
    
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (this.board[0][j] === this.board[1][j] && this.board[1][j] === this.board[2][j] && this.board[0][j] !== "") {
                return this.board[0][j]; // Player X or O wins
            }
        }
    
        // Check diagonals
        if (
            (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== "") ||
            (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== "")
        ) {
            return this.board[1][1]; // Player X or O wins
        }
    
        // Check for a draw
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === "") {
                    // If there's an empty cell, the game is not a draw yet
                    return "";
                }
            }
        }
    
        // If no player has won and there are no empty cells, it's a draw
        return "Draw";
    }
    
    
}



window.addEventListener("load" , () => {

    let canvas = document.getElementById("my_canvas");
    canvas.width = canvasSize; // רוחב -------
    canvas.height = canvasSize; // אורך | 
    let game = new TicTacToe(canvas);  
    document.getElementById("reset").addEventListener("click" ,(event) => game.resetGame(event));
    
});




