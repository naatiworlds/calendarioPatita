document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");
    const target = document.getElementById("target");
    const instruction = document.getElementById("instruction");
    const scoreDisplay = document.getElementById("score");
    const victoryTitle = document.getElementById("victory-title");

    let gameActive = false;
    let score = 0;
    let timerId;

    target.addEventListener("click", function() {
        if (gameActive) {
            score++;
            updateScore();
            moveTarget();
            resetTimer();

            if (score > 50) {
                endGame(true);
            }
        } else {
            startGame();
        }
    });

    function startGame() {
        gameActive = true;
        instruction.textContent = "Click now!";
        target.style.backgroundColor = "green";
        victoryTitle.style.display = "none";

        timerId = setTimeout(function() {
            if (gameActive) {
                endGame(false);
            }
        }, getRandomTime());
    }

    function endGame(isVictory) {
        gameActive = false;
        instruction.textContent = isVictory ? "You won! Click to play again" : "Game over. Click to play again";
        target.style.backgroundColor = isVictory ? "lightgreen" : "red";

        if (isVictory) {
            resetTarget(); // Reset target position on victory
            victoryTitle.style.display = "block";
        }

        score = 0; // Reset the score
        updateScore();
    }

    function resetTimer() {
        clearTimeout(timerId);
        startGame();
    }

    function resetTarget() {
        // Reset target to initial position
        target.style.left = "50%";
        target.style.top = "50%";
    }

    function getRandomTime() {
        // Generate a random time between 1000 and 5000 milliseconds (1 to 5 seconds)
        return Math.floor(Math.random() * 4000) + 1000;
    }

    function moveTarget() {
        const maxX = gameContainer.clientWidth - target.clientWidth;
        const maxY = gameContainer.clientHeight - target.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
    }

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}`;
    }
});
