// game.js
const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreValue = document.getElementById('score-value');

let score = 0;
let isJumping = false;
let isOnGround = true;
let jumpHeight = 100;
let fallSpeed = 5;
let moveDirection = 0; // 0 para no moverse, -1 para izquierda, 1 para derecha

let keys = {
    Space: false,
    ArrowRight: false,
    ArrowLeft: false,
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (event.code === 'Space' || event.code === 'KeyW') {
        jump();
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        keys.ArrowRight = true;
    } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        keys.ArrowLeft = true;
    }
}

function handleKeyUp(event) {
    if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        keys.ArrowRight = false;
    } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        keys.ArrowLeft = false;
    }
}

function jump() {
    if (isOnGround) {
        isJumping = true;
        isOnGround = false;
        jumpCharacter();
    }
}

function jumpCharacter() {
    let characterBottom = parseInt(getComputedStyle(character).bottom);

    let jumpInterval = setInterval(function () {
        if (characterBottom > 200 - jumpHeight) {
            clearInterval(jumpInterval);
            fallCharacter();
        }

        character.style.bottom = characterBottom + 50 + 'px';
        characterBottom += 20;
    }, 20);
}

function fallCharacter() {
    let characterBottom = parseInt(getComputedStyle(character).bottom);

    let fallInterval = setInterval(function () {
        if (characterBottom <= 0) {
            clearInterval(fallInterval);
            isOnGround = true;
            generateObstacle();
        }

        character.style.bottom = characterBottom - fallSpeed + 'px';
        characterBottom -= fallSpeed;
    }, 20);
}

function generateObstacle() {
    obstacle.style.left = '100%';

    // Calcular una altura que permita saltar el obstáculo
    let maxHeight = 200; // Altura máxima de salto
    let minHeight = 50;  // Altura mínima del obstáculo

    let obstacleHeight = Math.floor(Math.random() * (maxHeight - jumpHeight - minHeight)) + minHeight;
    obstacle.style.height = obstacleHeight + 'px';

    score++;
    scoreValue.textContent = score;
}

function moveCharacter() {
    let characterLeft = parseInt(getComputedStyle(character).left);
    
    // Asegurarse de que el personaje no se salga del tablero
    if ((keys.ArrowLeft && characterLeft > 0) || (keys.ArrowRight && characterLeft < window.innerWidth - 50)) {
        character.style.left = characterLeft + (keys.ArrowRight ? 5 : -5) + 'px';
    }
}


function moveObstacle() {
    let obstacleLeft = parseInt(getComputedStyle(obstacle).left);

    if (obstacleLeft < 0) {
        moveObstacleToStart();
    }

    obstacle.style.left = obstacleLeft - 5 + 'px';
}

function moveObstacleToStart() {
    obstacle.style.left = '100%';
}
function checkCollision() {
    let characterBottom = parseInt(getComputedStyle(character).bottom);
    let characterLeft = parseInt(getComputedStyle(character).left);
    let characterWidth = parseInt(getComputedStyle(character).width);
    let obstacleLeft = parseInt(getComputedStyle(obstacle).left);
    let obstacleHeight = parseInt(getComputedStyle(obstacle).height);

    // Añade un espacio adicional (offset) para hacer la colisión más sensible
    let offset = 5;

    if (
        characterBottom <= obstacleHeight &&
        characterLeft + characterWidth - offset > obstacleLeft &&
        characterLeft + offset < obstacleLeft + 50
    ) {
        gameOver();
    }
}

function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    // location.reload();  // No recargamos la página, ya que hemos terminado el juego
}
function resetGame() {
    document.location.reload();
}
function gameLoop() {
    moveCharacter();
    moveObstacle();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

gameLoop();
