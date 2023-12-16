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
        tiles = tiles.map((column, j) => {
            const newColumn = [];
            for (let i = 0; i < boardSize; i++) {
                newColumn[i] = 0;
            }
            let index = 0;
            for (let i = 0; i < boardSize; i++) {
                if (column[i] !== 0) {
                    if (newColumn[index] === 0) {
                        newColumn[index] = column[i];
                    } else if (newColumn[index] === column[i]) {
                        newColumn[index] *= 2;
                        score += newColumn[index];
                        moved = true;
                        index++;
                    } else {
                        index++;
                        newColumn[index] = column[i];
                        if (index !== i) {
                            moved = true;
                        }
                    }
                }
            }
            return newColumn;
        });
        return moved;
    }

    function move(direction) {
        let moved = false;

        if (direction === 'left') {
            tiles = tiles.map(row => moveRowLeft(row));
            moved = tiles.some(row => row.includes(0));
        } else if (direction === 'right') {
            tiles = tiles.map(row => moveRowRight(row));
            moved = tiles.some(row => row.includes(0));
        } else if (direction === 'up') {
            tiles = transpose(tiles);
            tiles = tiles.map(row => moveRowLeft(row));
            tiles = transpose(tiles);
            moved = tiles.some(row => row.includes(0));
        } else if (direction === 'down') {
            tiles = transpose(tiles);
            tiles = tiles.map(row => moveRowRight(row));
            tiles = transpose(tiles);
            moved = tiles.some(row => row.includes(0));
        }

        if (moved) {
            addNewTile();
            updateBoard();
        }
    }

    // Resto del código...



    function moveRowLeft(row) {
        const nonZeroTiles = row.filter(tile => tile !== 0);
        const movedRow = Array(boardSize).fill(0);

        for (let i = 0; i < nonZeroTiles.length; i++) {
            if (i < nonZeroTiles.length - 1 && nonZeroTiles[i] === nonZeroTiles[i + 1]) {
                // Combine tiles if they are the same
                movedRow[i] = 2 * nonZeroTiles[i];
                score += movedRow[i];
                i++; // Skip the next tile as it has already been combined
            } else {
                movedRow[i] = nonZeroTiles[i];
            }
        }

        return movedRow;
    }

    function moveRowRight(row) {
        const nonZeroTiles = row.filter(tile => tile !== 0);
        const movedRow = Array(boardSize).fill(0);

        for (let i = nonZeroTiles.length - 1, j = boardSize - 1; i >= 0; i--, j--) {
            if (i > 0 && nonZeroTiles[i] === nonZeroTiles[i - 1]) {
                // Combine tiles if they are the same
                movedRow[j] = 2 * nonZeroTiles[i];
                score += movedRow[j];
                i--; // Skip the next tile as it has already been combined
            } else {
                movedRow[j] = nonZeroTiles[i];
            }
        }

        return movedRow;
    }
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
        event.preventDefault();
        touchEndX = event.touches[0].clientX;
        touchEndY = event.touches[0].clientY;

        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;

        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = touchEndY - touchStartY;

        if (Math.abs(swipeDistanceX) > swipeThreshold || Math.abs(swipeDistanceY) > swipeThreshold) {
            if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
                move(swipeDistanceX > 0 ? 'right' : 'left');
            } else {
                move(swipeDistanceY > 0 ? 'down' : 'up');
            }
        }

        // Restablecer variables de control táctil
        touchStartX = 0;
        touchStartY = 0;
        touchEndX = 0;
        touchEndY = 0;
    }

    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    function checkGameLost() {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (tiles[i][j] === 0) {
                    return false; // Todavía hay espacio en el tablero
                }
                if (
                    (i < boardSize - 1 && tiles[i][j] === tiles[i + 1][j]) ||
                    (j < boardSize - 1 && tiles[i][j] === tiles[i][j + 1])
                ) {
                    return false; // Todavía hay combinaciones posibles
                }
            }
        }
        return true; // No hay espacio ni combinaciones posibles
    }

    function checkGameOver() {
        if (checkGameLost()) {
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

    // Event listeners for arrow keys
    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
        if (event.code === 'ArrowUp') {
            move('up');
        } else if (event.code === 'ArrowDown') {
            move('down');
        } else if (event.code === 'ArrowLeft') {
            move('left');
        } else if (event.code === 'ArrowRight') {
            move('right');
        }
    }

    // Event listener for reset button
    resetButton.addEventListener('click', resetGame);
});
