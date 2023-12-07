document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const selectedLevel = queryParams.get('level');

    const words = {
        easy: ['patita', 'te amo', 'natilla', 'melona'],
        medium: ['marmota', 'dormilona', 'abasho', 'siempre', 'juntas'],
        hard: ['natalia', 'buenoooss diaaass', 'somos un pack', 'ps eso'],
    };

    let selectedWord = '';
    let guessedLetters = [];
    let mistakes = 0;
    let maxMistakes = 6;

    const hangmanParts = document.querySelectorAll('.figure-part');
    const wordContainer = document.getElementById('word-container');
    const keyboardContainer = document.getElementById('keyboard-container');
    const messageContainer = document.getElementById('message-container');

    function chooseWord(difficulty) {
        const wordList = words[difficulty];
        return wordList[Math.floor(Math.random() * wordList.length)];
    }

    function displayWord() {
        wordContainer.innerHTML = '';
        selectedWord.split('').forEach((letter) => {
            const letterContainer = document.createElement('div');
            letterContainer.classList.add('word-letter');
            if (guessedLetters.includes(letter)) {
                letterContainer.textContent = letter;
            }
            wordContainer.appendChild(letterContainer);
        });
    }

    function displayKeyboard() {
        keyboardContainer.innerHTML = '';
        const alphabet = 'abcdefghijklmnopqrstuvwxyz ';
        alphabet.split('').forEach((letter) => {
            const key = document.createElement('div');
            key.classList.add('key');
            key.textContent = letter;
            key.addEventListener('click', () => guessLetter(letter));
            keyboardContainer.appendChild(key);
        });
    }

    function guessLetter(letter) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            if (!selectedWord.includes(letter)) {
                mistakes++;
                updateHangman();
            }
        }

        displayWord();
        checkGameStatus();
    }

    function updateHangman() {
        if (mistakes <= maxMistakes) {
            hangmanParts[mistakes - 1].style.display = 'initial';
        } else {
            endGame(false);
        }
    }

    function checkGameStatus() {
        if (!wordContainer.textContent.includes('_')) {
            endGame(true);
        }
    }

    function endGame(isWinner) {
        if (isWinner && wordContainer.textContent === selectedWord) {
            const message = document.createElement('p');
            message.textContent = '¡Ganaste! 😃';
            messageContainer.innerHTML = '';
            messageContainer.appendChild(message);

            const restartButton = document.createElement('button');
            restartButton.textContent = 'Reiniciar Juego';
            restartButton.addEventListener('click', () => startGame());
            messageContainer.appendChild(restartButton);
        }
        else if (!isWinner && mistakes >= maxMistakes) {
            const message = document.createElement('p');
            message.textContent = 'Perdiste 😢';
            messageContainer.innerHTML = '';
            messageContainer.appendChild(message);

            const restartButton = document.createElement('button');
            restartButton.textContent = 'Reiniciar Juego';
            restartButton.addEventListener('click', () => startGame());
            messageContainer.appendChild(restartButton);
        }
    }


    function startGame() {
        selectedWord = chooseWord(selectedLevel);
        guessedLetters = [];
        mistakes = 0;

        hangmanParts.forEach((part) => {
            part.style.display = 'none';
        });

        displayWord();
        displayKeyboard();
        messageContainer.innerHTML = '';
    }

    startGame(); // Llamada inicial al iniciar el juego
});