let currentPlayer = "X";
let gameBoard = Array(9).fill("");

function makeMove(index) {
    if (gameBoard[index] === "" && !isGameOver()) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        if (isWinner()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else if (isBoardFull()) {
            alert("It's a draw!");
            resetGame();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateCurrentPlayerDisplay();
        }
    }
}

function isWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => gameBoard[index] === currentPlayer)
    );
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== "");
}

function isGameOver() {
    return isWinner() || isBoardFull();
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
    });
}

function resetGame() {
    gameBoard = Array(9).fill("");
    updateBoard();
    currentPlayer = "X";
}

function updateCurrentPlayerDisplay() {
    const currentPlayerDisplay = document.getElementById("currentPlayer");
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
      }
                            
