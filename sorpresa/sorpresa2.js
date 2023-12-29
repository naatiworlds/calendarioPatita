var codigoOculto = document.getElementById('codigoOculto');
codigoOculto.style.fontSize = "10px";
codigoOculto.innerHTML = "fecha"

function verificarRespuesta() {
  var respuestaUsuario = document.getElementById('respuesta').value.toLowerCase();

  // Aquí deberías definir tu propio código oculto y la respuesta correcta
  
  var respuestaCorrecta = "09/12/2023";

  if (respuestaUsuario === respuestaCorrecta) {
    document.getElementById('resultado').innerHTML = "¡Felicidades! Has desbloqueado el <a href='./secreto2.html'>secreto</a>.";
  } else {
    document.getElementById('resultado').innerHTML = "Respuesta incorrecta. Inténtalo de nuevo.";
  }z
}
