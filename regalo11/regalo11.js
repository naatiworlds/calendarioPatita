document.addEventListener("DOMContentLoaded", function () {
    const crosswordContainer = document.getElementById("crossword-container");
    let selectedCell = null;

    const crosswordGrid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    const words = [
        { word: "PATITA", position: { row: 0, col: 0, horizontal: true } },
        { word: "TEAMO", position: { row: 3, col: 4, horizontal: false } },
        { word: " SIEMPRE", position: { row: 4, col: 0, horizontal: true } },
        { word: "JUNTAS", position: { row: 7, col: 0, horizontal: true } },
    ];

    initializeCrossword();

    function initializeCrossword() {
        for (let row = 0; row < crosswordGrid.length; row++) {
            for (let col = 0; col < crosswordGrid[row].length; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");

                if (crosswordGrid[row][col] === 1) {
                    cell.classList.add("filled");
                }

                cell.addEventListener("click", () => handleCellClick(row, col));

                crosswordContainer.appendChild(cell);
            }
        }

        words.forEach(wordInfo => addWordToCrossword(wordInfo));
    }

    function addWordToCrossword(wordInfo) {
        const { word, position } = wordInfo;
        const { row, col, horizontal } = position;

        const cells = document.querySelectorAll(".cell");
        let currentIndex = row * 5 + col;

        for (let i = 0; i < word.length; i++) {
            const currentCell = cells[currentIndex];

            if (!currentCell.classList.contains("filled")) {
                currentCell.textContent = word[i];
            }

            currentCell.classList.add("correct");

            if (horizontal) {
                currentIndex++;
            } else {
                currentIndex += 5;
            }
        }
    }

    function handleCellClick(row, col) {
        const clickedCell = document.querySelectorAll(".cell")[row * 5 + col];

        if (!clickedCell.classList.contains("filled")) {
            selectedCell = clickedCell;

            // Create an input element
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.style.width = "100%";
            input.style.textAlign = "center";
            input.addEventListener("keydown", handleInputKeydown);

            // Clear the cell and append the input
            selectedCell.innerHTML = "";
            selectedCell.appendChild(input);

            // Focus on the input
            input.focus();
        }
    }

    function handleInputKeydown(event) {
        if (event.key === "Enter") {
            // When Enter is pressed, update the cell with the input value
            const input = event.target;
            const inputValue = input.value.toUpperCase();

            selectedCell.innerHTML = inputValue;
            selectedCell.classList.add("correct");

            // Remove the input element
            input.remove();

            // Deselect the cell
            selectedCell = null;
        }
    }
});
