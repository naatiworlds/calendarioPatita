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
          day.innerHTML = `<button class="counter">${daysUntilUnlock} días</button>`;
        } else {
          // Contenido desbloqueado
          day.innerHTML = `Día ${i}`;
          // Aquí puedes agregar el contenido específico para cada día
          if (i === 1) {
            day.onclick = () => {
                const regalo = document.createElement('p');
                regalo.textContent = 'Ejemplo de regalo: Un pequeño dulce.';
                day.appendChild(regalo);
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
        pSections.textContent = 'Puedes jugas a algunos jueguitos';
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
        juegoBoton.setAttribute('src', '/assets/juegoBoton.png');
        juegoBoton.setAttribute('alt', 'imagen del juego del botón');
        juegoBoton.classList.add('juegoImg');
        enlaceJuegoBoton.appendChild(juegoBoton);

        // Juego rooted War
        const juegoRooted = document.createElement('img');
        juegoRooted.setAttribute('src', '/assets/juegoRooted.webp');
        juegoRooted.setAttribute('alt', 'imagen del juego del botón');
        juegoRooted.classList.add('juegoImg');
        enlaceJuegoRooted.appendChild(juegoRooted);
        
        // juego tikpocalipsis
        const juegoTikpocalipsis = document.createElement('img');
        juegoTikpocalipsis.setAttribute('src', '/assets/juegoTikpocalipsis.webp');
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
