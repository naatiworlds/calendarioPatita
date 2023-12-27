function reset() {
    location.reload();
}
document.addEventListener('DOMContentLoaded', function () {

const puzzleIzquierda = document.getElementById('puzzle-izquierda');
const puzzleMedio = document.getElementById('puzzle-medio');
const puzzleDerecha = document.getElementById('puzzle-derecha');
const piezasPuzzle = [];

// Crear y mezclar las piezas
for (let i = 1; i <= 12; i++) {
  const pieza = document.createElement('div');
  pieza.className = 'pieza-puzzle';
  pieza.draggable = true;
  pieza.textContent = i;
  pieza.style.backgroundImage = `url('./assets/abracito-${i}.png')`;
  piezasPuzzle.push(pieza);
}

// Mezclar el array de piezas
piezasPuzzle.sort(() => Math.random() - 0.5);

// Agregar las piezas a los contenedores
piezasPuzzle.forEach((pieza, index) => {
  if (index < 6) {
    puzzleIzquierda.appendChild(pieza);
  } else {
    puzzleDerecha.appendChild(pieza);
  }
});

// Hacer el área del medio sortable
new Sortable(puzzleIzquierda,{
  group: 'puzzle',
  animation: 150,
  onEnd: function (evt) {
    // Se ejecuta cuando se suelta una pieza en el área del medio
    const piezaArrastrada = evt.item;
    piezaArrastrada.style.position = 'static'; // Posición relativa al contenedor
    piezaArrastrada.style.margin = '5px'; // Añadir margen para separar las piezas
    piezaArrastrada.draggable = false;
    puzzleMedio.appendChild(piezaArrastrada); // Desactivar la capacidad de arrastrar
    verificarResultado()
  },
  
});
new Sortable(puzzleDerecha,{
  group: 'puzzle',
  animation: 150,
  onEnd: function (evt) {
    // Se ejecuta cuando se suelta una pieza en el área del medio
    const piezaArrastrada = evt.item;
    piezaArrastrada.style.position = 'static'; // Posición relativa al contenedor
    // piezaArrastrada.style.margin = '5px'; // Añadir margen para separar las piezas
    piezaArrastrada.draggable = false;
    puzzleMedio.appendChild(piezaArrastrada); // Desactivar la capacidad de arrastrar
    verificarResultado()
  },
  
});
new Sortable(puzzleMedio, {
    group: 'puzzle',
    animation: 150,
    onEnd: function (evt) {
      const piezaArrastrada = evt.item;
      piezaArrastrada.style.position = 'static';
      piezaArrastrada.draggable = false;
  
      const piezasIzquierda = puzzleIzquierda.getElementsByClassName('pieza-puzzle').length;
      const piezasDerecha = puzzleDerecha.getElementsByClassName('pieza-puzzle').length;
  
      // Verificar si se cumplen las condiciones antes de agregar la pieza
      if (piezasIzquierda < 6 && piezasDerecha < 6) {
        // Agregar la pieza al lado que tenga menos piezas
        if (piezasIzquierda < piezasDerecha) {
          puzzleIzquierda.appendChild(piezaArrastrada);
        } else if (piezasDerecha < piezasIzquierda){
          puzzleDerecha.appendChild(piezaArrastrada);
        }
      }
  
      verificarResultado();
    },
  });
  
let resultadoVerificado = false; // Variable para rastrear si ya se ha verificado el resultado

  function verificarResultado() {
    const piezasOrdenadas = Array.from(puzzleMedio.children).map(pieza => pieza.textContent);
    const piezasCorrectas = piezasOrdenadas.every((valor, index) => parseInt(valor) === index + 1);

    if (!resultadoVerificado && piezasCorrectas && piezasOrdenadas.length === 12) {
      mostrarResultado('¡Sorpresaaa!');
      resultadoVerificado = true;
    } else if (!resultadoVerificado && piezasOrdenadas.length === 12) {
      mostrarResultado('¡Has Perdido!');
      resultadoVerificado = true;
    }
  }

  function mostrarResultado(mensaje) {
    const resultadoMensaje = document.createElement('a');
    resultadoMensaje.setAttribute('href', '#');
    resultadoMensaje.textContent = mensaje;
    document.body.appendChild(resultadoMensaje);
  }
});