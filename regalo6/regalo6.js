function resetGame() {
    document.location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    const gameOver = document.getElementById('game-over');
    const gameWon = document.getElementById('game-won');
    let correctLetters = 0;
    let missedLetters = 0;

    function createTile() {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        tile.classList.add(`column-${Math.ceil(Math.random() * 3)}`);
        tile.addEventListener('animationend', () => onTileAnimationEnd(tile));
        gameContainer.appendChild(tile);
    }

    function onTileAnimationEnd(tile) {
        gameContainer.removeChild(tile);
        missedLetters++;
        checkGameOver();
    }

    function checkGameOver() {
        if (missedLetters >= 10) {
            gameContainer.textContent = '';
            gameOver.style.display = 'block';
        }
    }

    function onTouchOrKeyDown(event) {
        const key = event.type === 'keydown' ? event.key.toUpperCase() : event.target.textContent;
        const tiles = document.querySelectorAll('.tile');

        tiles.forEach(tile => {
            if (tile.textContent === key) {
                gameContainer.removeChild(tile);
                correctLetters++;
                missedLetters = 0;
            }
        });

        checkGameWon();
    }

    function checkGameWon() {
        if (correctLetters >= 50) {
            gameWon.style.display = 'block';
        }
    }

    // Event listener para teclado
    document.addEventListener('keydown', onTouchOrKeyDown);

    // Event listener para dispositivos táctiles
    gameContainer.addEventListener('click', onTouchOrKeyDown);

    // Genera nuevas fichas cada segundo
    setInterval(createTile, 1000);
});
