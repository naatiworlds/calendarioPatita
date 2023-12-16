document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 4;
    const gridSize = 80;
    const board = document.getElementById('game-board');
    const scoreValue = document.getElementById('score-value');
    const gameOverDiv = document.getElementById('game-over');
    const resetButton = document.getElementById('reset-button');

    let score = 0;
    let tiles = [];

    function initializeBoard() {
        for (let i = 0; i < boardSize; i++) {
            tiles[i] = [];
            for (let j = 0; j < boardSize; j++) {
                tiles[i][j] = 0;
            }
        }
        addNewTile();
        addNewTile();
        updateBoard();
    }

    function addNewTile() {
        const availableTiles = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (tiles[i][j] === 0) {
                    availableTiles.push({ row: i, col: j });
                }
            }
        }

        if (availableTiles.length > 0) {
            const { row, col } = availableTiles[Math.floor(Math.random() * availableTiles.length)];
            tiles[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function updateBoard() {
        board.innerHTML = '';
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const tileValue = tiles[i][j];
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.style.top = i * gridSize + 'px';
                tile.style.left = j * gridSize + 'px';
                if (tileValue > 0) {
                    tile.textContent = tileValue;
                    tile.classList.add(`value-${tileValue}`);
                }
                board.appendChild(tile);
            }
        }
        scoreValue.textContent = score;
        checkGameOver();
    }

    function combineTiles() {
        let moved = false;
        tiles = tiles.map(row => {
            const newRow = [];
            for (let i = 0; i < boardSize; i++) {
                newRow[i] = 0;
            }
            let index = 0;
            for (let i = 0; i < boardSize; i++) {
                if (row[i] !== 0) {
                    if (newRow[index] === 0) {
                        newRow[index] = row[i];
                    } else if (newRow[index] === row[i]) {
                        newRow[index] *= 2;
                        score += newRow[index];
                        moved = true;
                        index++;
                    } else {
                        index++;
                        newRow[index] = row[i];
                        if (index !== i) {
                            moved = true;
                        }
                    }
                }
            }
            return newRow;
        });
        return moved;
    }

    function move(direction) {
        let moved = false;
        if (direction === 'left' || direction === 'right') {
            tiles = direction === 'left' ? tiles : tiles.map(row => row.reverse());
            moved = combineTiles();
            tiles = direction === 'left' ? tiles : tiles.map(row => row.reverse());
        } else if (direction === 'up' || direction === 'down') {
            tiles = direction === 'up' ? tiles : transpose(tiles);
            moved = combineTiles();
            tiles = direction === 'up' ? tiles : transpose(tiles);
        }
        if (moved) {
            addNewTile();
        }
        updateBoard();
    }

    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    function checkGameOver() {
        let gameOver = true;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (tiles[i][j] === 0) {
                    gameOver = false;
                    break;
                }
                if (
                    (i < boardSize - 1 && tiles[i][j] === tiles[i + 1][j]) ||
                    (j < boardSize - 1 && tiles[i][j] === tiles[i][j + 1])
                ) {
                    gameOver = false;
                    break;
                }
            }
            if (!gameOver) {
                break;
            }
        }

        if (gameOver) {
            gameOverDiv.style.display = 'block';
        }
    }

    function resetGame() {
        score = 0;
        tiles = [];
        gameOverDiv.style.display = 'none';
        initializeBoard();
    }

    // Initialize the game board
    initializeBoard();

    // Enable dragging of tiles using Sortable library
    new Sortable(document.getElementById('game-board'), {
        group: 'game-board',
        animation: 150,
        onStart(evt) {
            evt.from.classList.add('dragging');
            // move(evt.oldIndex < evt.newIndex ? 'down' : 'up');

        },
        onEnd(evt) {
            evt.from.classList.remove('dragging');
        },
    });

    // Event listener for reset button
    resetButton.addEventListener('click', resetGame);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

});
