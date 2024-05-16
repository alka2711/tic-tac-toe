document.addEventListener('DOMContentLoaded', function () {
    const message = document.getElementById('message');
    const board = document.getElementById('board');
    const resetBtn = document.getElementById('resetBtn');
    const onePlayerBtn = document.getElementById('onePlayerBtn');
    const twoPlayersBtn = document.getElementById('twoPlayersBtn');
    const cells = Array.from({ length: 9 }, (_, index) => index + 1);

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);
    let gameActive = false;
    let onePlayerMode = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function startGame(isOnePlayer) {
        onePlayerMode = isOnePlayer;
        currentPlayer = 'X';
        gameBoard = Array(9).fill(null);
        gameActive = true;

        board.innerHTML = '';
        cells.forEach((cell) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.dataset.cell = cell;
            cellElement.addEventListener('click', handleCellClick);
            board.appendChild(cellElement);
        });

        message.innerText = `Player X's turn`;
    }

    function handleCellClick(event) {
        if (!gameActive) return;

        const cell = event.target;
        const selectedCell = cell.dataset.cell;

        if (!gameBoard[selectedCell - 1]) {
            gameBoard[selectedCell - 1] = currentPlayer;
            cell.innerText = currentPlayer;

            if (checkWinner()) {
                message.innerText = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (isBoardFull()) {
                message.innerText = "It's a tie!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    }

    function isBoardFull() {
        return gameBoard.every(cell => cell !== null);
    }

    function resetGame() {
        gameActive = false;

        onePlayerMode = false;
        startGame(false);
    }

    onePlayerBtn.addEventListener('click', function () {
        resetGame();
        startGame(true);
    });

    twoPlayersBtn.addEventListener('click', function () {
        resetGame();
        startGame(false);
    });

    resetBtn.addEventListener('click', function () {
        resetGame();
    });
});
