// regalo7.js
const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreValue = document.getElementById('score-value');

let distance = 0;
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

let firstObstacle = true;

function generateObstacle() {
    obstacle.style.left = '100%';

    // Calcular una altura que permita saltar el obstáculo
    let maxHeight = 200; // Altura máxima de salto
    let minHeight = 50;  // Altura mínima del obstáculo

    let obstacleHeight;
    
    if (firstObstacle) {
        // Si es el primer obstáculo, asegurémonos de que sea una fruta
        obstacleHeight = 50; // Altura mínima para la fruta
        firstObstacle = false;
    } else {
        // Obstáculo normal con altura aleatoria
        obstacleHeight = Math.floor(Math.random() * (maxHeight - jumpHeight - minHeight)) + minHeight;
    }

    obstacle.style.height = obstacleHeight + 'px';
    obstacle.style.background = 'transparent';
    // Determina la fruta según la altura del obstáculo
    let fruitType = '';

    if (obstacleHeight < 80) {
        fruitType = 'manzana';
    } else if (obstacleHeight < 90) {
        fruitType = 'sandia';
    } else {
        fruitType = 'platano';
    }

    // Crea un elemento de imagen para representar la fruta
    let fruitImage = new Image();
    fruitImage.src = `./assets/${fruitType}.png`;
    fruitImage.alt = fruitType;
    fruitImage.width = 50;
    fruitImage.height = obstacleHeight;

    // Espera a que la imagen se cargue completamente antes de agregarla al obstáculo
    fruitImage.onload = function () {
        // Limpia el contenido actual y agrega la imagen de la fruta
        obstacle.innerHTML = '';
        obstacle.appendChild(fruitImage);

        // Mueve el obstáculo solo después de cargar la imagen
        moveObstacle();
    };

     // Ajusta según tu preferencia
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
    scoreValue.textContent = distance += 1; 
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
    distance = 0
    scoreValue.textContent = distance 
    document.location.pathname();
}

function resetGame() {
    // Restablecer variables y puntuación
    distance = 0;
    score = 0;
    isJumping = false;
    isOnGround = true;
    firstObstacle = true;

    // Ocultar el mensaje de Game Over
    document.getElementById('game-over').style.display = 'none';

    // Limpiar el contenido actual del obstáculo
    obstacle.innerHTML = '';

    // Reiniciar el bucle del juego
    gameLoop();
}
function gameLoop() {
    moveCharacter();
    moveObstacle();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

gameLoop();
