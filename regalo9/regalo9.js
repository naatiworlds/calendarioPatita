const colors = ['green', 'red', 'yellow', 'blue', 'orange', 'violet', 'pink' ,'brown', 'lightblue'];
        let sequence = [];
        let userSequence = [];
        let round = 1;

        function startGame() {
            sequence = [];
            userSequence = [];
            round = 1;
            nextRound();
        }

        function nextRound() {
            generateSequence();
            showSequence();
        }

        function generateSequence() {
            for (let i = 0; i < round; i++) {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                sequence.push(randomColor);
            }
        }

        function showSequence() {
            let i = 0;
            const intervalId = setInterval(() => {
                playColor(sequence[i]);
                i++;
                if (i >= sequence.length) {
                    clearInterval(intervalId);
                    enableButtons();
                }
            }, 1000);
        }

        function playColor(color) {
            const button = document.querySelector(`.${color}`);
            button.classList.add('active');
            document.getElementById(`${color}-sound`).play();
            setTimeout(() => {
                button.classList.remove('active');
            }, 500);
        }

        function enableButtons() {
            document.querySelectorAll('.button').forEach(button => {
                button.disabled = false;
            });
        }

        function disableButtons() {
            document.querySelectorAll('.button').forEach(button => {
                button.disabled = true;
            });
        }

        function handleButtonClick(color) {
            playColor(color);
            userSequence.push(color);

            if (!checkUserInput()) {
                gameOver();
                return;
            }

            if (userSequence.length === sequence.length) {
                disableButtons();
                setTimeout(() => {
                    round++;
                    userSequence = [];
                    nextRound();
                }, 1000);
            }
        }

        function checkUserInput() {
            for (let i = 0; i < userSequence.length; i++) {
                if (userSequence[i] !== sequence[i]) {
                    return false;
                }
            }
            return true;
        }

        function gameOver() {
            document.getElementById('game-over-title').style.display = 'block';
            setTimeout(() => {
                document.getElementById('game-over-title').style.display = 'none';
            }, 3000);
            startGame();
        }

        // Start the game
        startGame();