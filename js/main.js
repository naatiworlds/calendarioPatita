document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Devuelve un valor de 0 a 11, por lo que se suma 1.

    if (currentMonth === 12 ) {
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
    }
  });
