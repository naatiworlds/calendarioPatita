const palabras = {
    palabra1: "9",
    palabra2: "febrero",
    palabra3: "amigas",
    palabra4: "hermanas",
    palabra5: "relación",
    palabra6: "más",
    palabra7: "twitch",
    palabra8: "discord",
    palabra9: "ojos",
    palabra10: "te quiero",
    palabra11: "te amo",
    palabra12: "SIEMPRE",
    palabra13: "JUNTAS",
  };
  
  function iniciarReproduccion() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();
  }

  document.addEventListener('DOMContentLoaded', function () {
    const resultadoElemento = document.getElementById('resultado');

    for (const key in palabras) {
      if (palabras.hasOwnProperty(key)) {
        const palabraIncompleta = document.getElementById(key);
        const palabraCompleta = palabras[key];

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', palabraCompleta.length);
        palabraIncompleta.appendChild(input);

        input.addEventListener('input', function () {
          const valorInput = this.value.toLowerCase();
          if (valorInput === palabraCompleta.toLowerCase()) {
            resultadoElemento.textContent = '¡Correcto!';
          } else {
            resultadoElemento.textContent = '';
          }
        });
      }
    }
  });