const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const patitoImg = new Image();
patitoImg.src = './assets/duck.png'; // Ruta de tu imagen de patito

const pipaImg = new Image();
pipaImg.src = './assets/tijuana.webp'; // Ruta de tu imagen de pipa

const patito = {
  x: 225,
  y: 380,
  width: 150,
  height: 150,
};

const pipas = [];
const piperCounter = document.getElementById('piperCounter');
let pipasRecogidas = 0;

const keys = {
  left: false,
  right: false,
};

// Manejo de eventos táctiles
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(e) {
  if (e.touches[0].clientX < canvas.width / 2) {
    keys.left = true;
    keys.right = false;
  } else {
    keys.left = false;
    keys.right = true;
  }
}

function handleTouchEnd() {
  keys.left = false;
  keys.right = false;
}

function drawPatito() {
  ctx.drawImage(patitoImg, patito.x, patito.y, patito.width, patito.height);
}

function drawPipas() {
  pipas.forEach(pipa => {
    ctx.drawImage(pipaImg, pipa.x, pipa.y, pipa.width, pipa.height);
  });
}

function movePatito() {
  if (keys.left && patito.x > 0) {
    patito.x -= 5;
  }

  if (keys.right && patito.x < canvas.width - patito.width) {
    patito.x += 5;
  }
}

function generatePipas() {
  const nuevaPipa = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 40,
    height: 60,
    speed: Math.random() * 2 + 1,
  };
  pipas.push(nuevaPipa);
}

function detectarColisiones() {
  pipas.forEach((pipa, index) => {
    if (
      patito.x < pipa.x + pipa.width &&
      patito.x + patito.width > pipa.x &&
      patito.y < pipa.y + pipa.height &&
      patito.y + patito.height > pipa.y
    ) {
      pipas.splice(index, 1);
      pipasRecogidas += 1;
      actualizarContador();

      // Guardar los puntos en un archivo JSON local
      guardarPuntosLocal();
    }
  });
}

function actualizarContador() {
  piperCounter.textContent = `Pipas recogidas: ${pipasRecogidas}`;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPatito();

  if (Math.random() < 0.02) {
    generatePipas();
  }

  drawPipas();
  pipas.forEach(pipa => {
    pipa.y += pipa.speed;
  });

  detectarColisiones();
  movePatito();

  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    keys.left = true;
  }

  if (event.key === 'd') {
    keys.right = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'a') {
    keys.left = false;
  }

  if (event.key === 'd') {
    keys.right = false;
  }
});

Promise.all([loadImage(patitoImg), loadImage(pipaImg)]).then(() => {
  // Cargar puntos almacenados localmente al iniciar el juego
  cargarPuntosLocal().then(() => {
    gameLoop();
  });
});

function loadImage(img) {
  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
}

function guardarPuntosLocal() {
  const puntosLocal = { puntos: pipasRecogidas };
  const puntosJSON = JSON.stringify(puntosLocal);

  // Guardar en el sistema de archivos local del navegador
  window.localStorage.setItem('puntos', puntosJSON);
}

function cargarPuntosLocal() {
  return new Promise(resolve => {
    const puntosJSON = window.localStorage.getItem('puntos');

    if (puntosJSON) {
      const puntosLocal = JSON.parse(puntosJSON);
      pipasRecogidas = puntosLocal.puntos || 0;
      actualizarContador();
    }

    resolve();
  });
}
