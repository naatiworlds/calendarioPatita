const crossword = document.getElementById('crossword');
        const resultDiv = document.getElementById('result');
        const words = ["patita", "teamo", "siempre", "juntas", "nati", "twitch", "abasho"]
        // const words = ["patita", "teamo", "siempre", "juntas", "nati", "twitch", "abasho"];

        function createCrossword() {
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.dataset.row = i;
                    cell.dataset.col = j;

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.addEventListener('input', validateCrossword);

                    cell.appendChild(input);

                    if (i === 0 && j < 6) {
                        cell.classList.add(words[0][j]); // patita
                        // console.log(cell.textContent = words[0][j])
                    } else if (i < 5 && j === 2) {
                        cell.classList.add(words[1][i]); //teamo
                        // console.log(cell.textContent = words[1][i]) //teamo

                    } else if (i === 6 && j <= 7) {
                        cell.classList.add(words[2][j]); // siempre
                        // cell.textContent = words[2][j]
                    } else if (i > 0 && i < 6 && j === 0) {
                        cell.classList.add(words[3][i - 1]); // juntas
                        // cell.textContent = words[3][i-1]
                        // console.log(cell.textContent = words[3][i-1])
                    } else if (i === 2 && j > 0 && j < 5) {
                        cell.classList.add(words[4][j - 1]); // nati
                        // cell.textContent = words[4][j-1]
                    } else if (i < 7 && j === 4) {
                        cell.classList.add(words[5][i]); // twitch
                        // cell.textContent = words[5][i]
                    } else if (i === 5 && j < 7) {
                        cell.classList.add(words[6][j]); // abasho
                        // cell.textContent = words[6][j]
                    } else {
                        cell.classList.add("undefined");
                    }

                    crossword.appendChild(cell);
                }
            }
        }

        createCrossword();

        function validateCrossword(event) {
            const input = event.target;
            const cell = input.parentElement;

            if (input.value.toLowerCase() === cell.classList[1]) {
                cell.classList.add('correct');
                cell.classList.remove('incorrect');
            } else {
                cell.classList.remove('correct');
                cell.classList.add('incorrect');
            }

            checkVictory();
        }

        function checkVictory() {
            const cells = document.querySelectorAll('.cell:not(.undefined)');
            const incorrectCells = document.querySelectorAll('.incorrect');
            const correctCells = document.querySelectorAll('.correct');
        
            if (incorrectCells.length === 0 && correctCells.length === cells.length) {
                resultDiv.textContent = "¡Has ganado!";
            } else {
                resultDiv.textContent = "";
            }
        }
        