document.addEventListener('DOMContentLoaded', function () {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Devuelve un valor de 0 a 11, por lo que se suma 1.

  if (currentMonth === 12) {
    const calendar = document.getElementById('calendar');

    for (let i = 1; i <= 31; i++) {
      const day = document.createElement('div');
      day.classList.add('day');

      if (i > currentDate.getDate()) {
        day.classList.add('locked');
        const daysUntilUnlock = i - currentDate.getDate();
        day.innerHTML = `<p class="counter">quedan [${daysUntilUnlock} días]</p>`;
      } else {
        // Contenido desbloqueado
        day.innerHTML = `Día ${i}`;
        // Aquí puedes agregar el contenido específico para cada día
        if (i === 1) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo1 = document.createElement('a');
              regalo1.setAttribute('href', 'regalo1/regalo1.html');
              regalo1.setAttribute('target', '_blank');
              regalo1.classList.add('regalo1');
              regalo.textContent = '> Regalo día 1.';
              regalo1.appendChild(regalo);
              day.appendChild(regalo1);
            }
          }
        }
        
        if (i === 2) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo2 = document.createElement('a');
              regalo2.setAttribute('href', 'regalo2/regalo2.html');
              regalo2.setAttribute('target', '_blank');
              regalo2.classList.add('regalo1');
              regalo.textContent = '> Regalo día 2.';
              regalo2.appendChild(regalo);
              day.appendChild(regalo2);
            }
          }
        }
        if (i === 3) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo3 = document.createElement('a');
              regalo3.setAttribute('href', 'regalo3/regalo3.html');
              regalo3.setAttribute('target', '_blank');
              regalo3.classList.add('regalo1');
              regalo.textContent = '> Regalo día 3.';
              regalo3.appendChild(regalo);
              day.appendChild(regalo3);
            }
          }
        }
        if (i === 4) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo4 = document.createElement('a');
              regalo4.setAttribute('href', 'regalo4/regalo4.html');
              regalo4.setAttribute('target', '_blank');
              regalo4.classList.add('regalo1');
              regalo.textContent = '> Regalo día 4.';
              regalo4.appendChild(regalo);
              day.appendChild(regalo4);
            }
          }
        }
        if (i === 5) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo5 = document.createElement('a');
              regalo5.setAttribute('href', 'regalo5/regalo5.html');
              regalo5.setAttribute('target', '_blank');
              regalo5.classList.add('regalo1');
              regalo.textContent = '> Regalo día 5.';
              regalo5.appendChild(regalo);
              day.appendChild(regalo5);
            }
          }
        }
        if (i === 6) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo6 = document.createElement('a');
              regalo6.setAttribute('href', 'regalo6/regalo6.html');
              regalo6.setAttribute('target', '_blank');
              regalo6.classList.add('regalo1');
              regalo.textContent = '> Regalo día 6.';
              regalo6.appendChild(regalo);
              day.appendChild(regalo6);
            }
          }
        }
        if (i === 7) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo7 = document.createElement('a');
              regalo7.setAttribute('href', 'regalo7/regalo7.html');
              regalo7.setAttribute('target', '_blank');
              regalo7.classList.add('regalo1');
              regalo.textContent = '> Regalo día 7.';
              regalo7.appendChild(regalo);
              day.appendChild(regalo7);
            }
          }
        }
        if (i === 8) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo8 = document.createElement('a');
              regalo8.setAttribute('href', 'regalo8/regalo8.html');
              regalo8.setAttribute('target', '_blank');
              regalo8.classList.add('regalo1');
              regalo.textContent = '> Regalo día 8.';
              regalo8.appendChild(regalo);
              day.appendChild(regalo8);
            }
          }
        }
        if (i === 10) {
          day.onclick = () => {
            const existingRegalo = day.querySelector('.regalo1');
        
            if (existingRegalo) {
              // Si ya existe el regalo, elimínalo
              existingRegalo.remove();
            } else {
              // Si no existe, crea el regalo
              const regalo = document.createElement('p');
              const regalo10 = document.createElement('a');
              regalo10.setAttribute('href', 'regalo10/regalo10.html');
              regalo10.setAttribute('target', '_blank');
              regalo10.classList.add('regalo1');
              regalo.textContent = '> Regalo día 10.';
              regalo10.appendChild(regalo);
              day.appendChild(regalo10);
            }
          }
        }
        
        
      }
      
      calendar.appendChild(day);
    }
  } else {
    // Mensaje para meses que no son diciembre
    const message = document.createElement('p');
    message.textContent = 'El calendario de adviento está disponible solo en diciembre.';
    document.body.appendChild(message);

    // para mientras espera
    const esperar = document.createElement('section');
    const tituloSections = document.createElement('h2');
    const pSections = document.createElement('p');
    tituloSections.textContent = 'Y para mientras esperas...';
    pSections.textContent = 'Puedes jugar a algunos jueguitos';
    // Los juegos a introducir
    const juegos = document.createElement('div');
    juegos.classList.add('juegos');
    // Enlaces a los juegos

    // enlace juego boton
    const enlaceJuegoBoton = document.createElement('a');
    enlaceJuegoBoton.setAttribute('href', 'https://naatii.github.io/JuegoBoton/');
    enlaceJuegoBoton.setAttribute('target', '_blank');

    // enlace juego rooted war
    const enlaceJuegoRooted = document.createElement('a');
    enlaceJuegoRooted.setAttribute('href', 'https://gaulent.itch.io/rooted-war');
    enlaceJuegoRooted.setAttribute('target', '_blank');

    // enlace juego tikpocalipsis

    const enlaceJuegoTikpocalipsis = document.createElement('a');
    enlaceJuegoTikpocalipsis.setAttribute('href', 'https://alexroivas.itch.io/tikpocalipsis');
    enlaceJuegoTikpocalipsis.setAttribute('target', '_blank');

    // juego del botón
    const juegoBoton = document.createElement('img');
    juegoBoton.setAttribute('src', 'img/juegoBoton.png');
    juegoBoton.setAttribute('alt', 'imagen del juego del botón');
    juegoBoton.classList.add('juegoImg');
    enlaceJuegoBoton.appendChild(juegoBoton);

    // Juego rooted War
    const juegoRooted = document.createElement('img');
    juegoRooted.setAttribute('src', 'img/juegoRooted.webp');
    juegoRooted.setAttribute('alt', 'imagen del juego del botón');
    juegoRooted.classList.add('juegoImg');
    enlaceJuegoRooted.appendChild(juegoRooted);

    // juego tikpocalipsis
    const juegoTikpocalipsis = document.createElement('img');
    juegoTikpocalipsis.setAttribute('src', 'img/juegoTikpocalipsis.webp');
    juegoTikpocalipsis.setAttribute('alt', 'imagen del juego del botón');
    juegoTikpocalipsis.classList.add('juegoImg');
    enlaceJuegoTikpocalipsis.appendChild(juegoTikpocalipsis);

    // Añadiendo todo al html
    document.body.appendChild(esperar);
    esperar.appendChild(tituloSections);
    esperar.appendChild(pSections);
    juegos.appendChild(enlaceJuegoBoton);
    juegos.appendChild(enlaceJuegoRooted);
    juegos.appendChild(enlaceJuegoTikpocalipsis);
    esperar.appendChild(juegos);
  }
});
