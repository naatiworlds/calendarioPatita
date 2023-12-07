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

  document.addEventListener('DOMContentLoaded', function () {
    const resultadoElemento = document.getElementById('resultado');
    const enhorabuenaElemento = document.createElement('p');
    const sorpresaElemento = document.createElement('p');
    enhorabuenaElemento.textContent = "¡¡Enhorabuenaa!!"
    sorpresaElemento.textContent = "Sorpresaa!!"
    const enlaceSorpresa =  document.createElement('a');
    enlaceSorpresa.setAttribute('href', '../sorpresa/sorpresa1.html');
    enlaceSorpresa.setAttribute('target', '_blank');
    enlaceSorpresa.appendChild(sorpresaElemento);
    // enlace a una página con un acertijo para la pista con algo bonito nuesto.
    let palabrasCorrectas = 0;

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
            palabrasCorrectas++;
            resultadoElemento.textContent = '¡Correcto!';
          } else {
            resultadoElemento.textContent = '¡Incorrecto!';
          }

          // Comprobar si todas las palabras son correctas
          if (palabrasCorrectas === Object.keys(palabras).length) {
            resultadoElemento.appendChild(sorpresaElemento);
          }
        });
      }
    }
  });