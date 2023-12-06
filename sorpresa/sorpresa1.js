const input = document.createElement('input')
input.classList.add('input')
const resultadoElemento = document.getElementById('resultado');
document.body.appendChild(input);

input.addEventListener('input', function () {
    const contraseña = "patita";
    if (contraseña === this.value.toLowerCase()) {
      resultadoElemento.textContent = '¡Correcto!';
      const sorpresa1 = document.createElement('p');
      const enlacesorpresa1 = document.createElement('a');
      sorpresa1.textContent = 'Aquí tienes tu sorpresa';
      enlacesorpresa1.setAttribute('href', 'https://view.genial.ly/628514192ce6f00019468ae9/interactive-content-natilla');
      enlacesorpresa1.setAttribute('target', '_blank');
      enlacesorpresa1.appendChild(sorpresa1);
      document.body.appendChild(enlacesorpresa1);
    } else {
      resultadoElemento.textContent = '¡Incorrecto!';
    }
    
});