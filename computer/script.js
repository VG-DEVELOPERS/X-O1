let currentPlayer = "";
let gameBoard = Array(9).fill("");
let playerSymbol = "";
let computerSymbol = "";
let playerName = "Player";
let computerName = "Computer";

function selectSymbol(symbol) {
    playerSymbol = symbol;
    computerSymbol = symbol === "X" ? "O" : "X";
    currentPlayer = playerSymbol;
    
    document.getElementById("symbolSelection").style.display = "none";
    document.getElementById("board").style.display = "grid";
    
    if (playerSymbol === "O") {
        makeComputerMove();
    }
    
    updateCurrentPlayerDisplay();
}

function makeMove(index) {
    if (gameBoard[index] === "" && currentPlayer === playerSymbol && !isGameOver()) {
        gameBoard[index] = playerSymbol;
        updateBoard();
        if (isWinner()) {
            alert(`${playerName} wins!`);
            resetGame();
        } else if (isBoardFull()) {
            alert("It's a draw!");
            resetGame();
        } else {
            currentPlayer = computerSymbol;
            makeComputerMove();
        }
    }
}

function makeComputerMove() {
    if (currentPlayer === computerSymbol && !isGameOver()) {
        // Implement computer's move logic here
        // For simplicity, a random empty cell is chosen in this example
        let emptyCells = gameBoard.reduce((acc, cell, index) => {
            if (cell === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        if (emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            gameBoard[emptyCells[randomIndex]] = computerSymbol;
            updateBoard();
            if (isWinner()) {
                alert(`${computerName} wins!`);
                resetGame();
            } else if (isBoardFull()) {
                alert("It's a draw!");
                resetGame();
            } else {
                currentPlayer = playerSymbol;
            }
        }
        updateCurrentPlayerDisplay();
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
    currentPlayer = playerSymbol;
}

function updateCurrentPlayerDisplay() {
    const currentPlayerDisplay = document.getElementById("currentPlayer");
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer === playerSymbol ? playerName : computerName}`;
}
function resetGame() {
    gameBoard = Array(9).fill("");
    updateBoard();
    currentPlayer = playerSymbol; // Reset to player's turn
    updateCurrentPlayerDisplay();
}
  
