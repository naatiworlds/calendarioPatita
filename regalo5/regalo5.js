const questions = [
    {
      question: "¿En qué lado te gusta más dormir?",
      options: ["Derecha", "Izquierda"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Quién es más probable que vaya a la cárcel?",
      options: ["Natilla", "Patita"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Eres team natilla o team patita?",
      options: ["Natilla", "Patita"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Se almuerza a qué hora?",
      options: ["A las 12:00 am", "A las 14:00 pm"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Quién ama más a quién?",
      options: ["Natilla a patita", "Natilla a patita"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Quién es más probable que deje calcetines tirados por el suelo?",
      options: ["Natilla", "Patita"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Quién es más probable que al cocinar queme la casa entera?",
      options: ["Natilla", "Patita"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Quién dará el primer abrazo?",
      options: ["Natilla", "Patita"],
      optionCounts: [0, 0]
    },
    {
      question: "¿Crees que natilla le caerá bien a tus conocidos?",
      options: ["No", "Si"],
      optionCounts: [0, 0]
    },
  ];
  
  let currentQuestionIndex = 0;
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = currentQuestion.question;
    document.querySelectorAll(".option-button").forEach((button, index) => {
      button.textContent = currentQuestion.options[index];
    });
  
    // Cargar porcentajes guardados del localStorage si están disponibles
    const savedCounts = JSON.parse(localStorage.getItem(`results_${currentQuestionIndex}`));
    if (savedCounts) {
      questions[currentQuestionIndex].optionCounts = savedCounts;
      showResults();
    }
  }
  
  function selectOption(optionIndex) {
    // Incrementar el recuento de la opción seleccionada
    questions[currentQuestionIndex].optionCounts[optionIndex]++;
  
    // Guardar los resultados en localStorage
    saveResultsToLocalStorage();
  
    // Mostrar los resultados de la pregunta actual
    showResults();
  
    // Cargar la siguiente pregunta
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      // Muestra resultados finales al finalizar todas las preguntas
      showFinalResults();
    }
  }
  
  function saveResultsToLocalStorage() {
    // Guardar los resultados en localStorage con un nombre único
    localStorage.setItem(`results_${currentQuestionIndex}`, JSON.stringify(questions[currentQuestionIndex].optionCounts));
  }
  
  function showResults() {
    const currentQuestion = questions[currentQuestionIndex];
    const totalResponses = currentQuestion.optionCounts.reduce((a, b) => a + b, 0);
    const percentageOptions = currentQuestion.optionCounts.map(count => (count / totalResponses) * 100);
  
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.visibility = "visible"
    resultContainer.innerHTML = `
        <p>Resultados para la pregunta "${currentQuestion.question}":</p>
        <p>${currentQuestion.options[0]}: ${percentageOptions[0].toFixed(2)}%</p>
        <p>${currentQuestion.options[1]}: ${percentageOptions[1].toFixed(2)}%</p>
    `;
  }
  
  function showFinalResults() {
    const victoria = document.getElementById("victoria");
    textoVictoria = document.createElement("h2")
    textoVictoria.textContent = "¡Enhorabuena completaste todas las preguntas!"
    victoria.appendChild(textoVictoria)
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "<p>Resultados finales:</p>";
  
    questions.forEach((question, index) => {
      const totalResponses = question.optionCounts.reduce((a, b) => a + b, 0);
      const percentageOptions = question.optionCounts.map(count => (count / totalResponses) * 100);
  
      resultContainer.innerHTML += `
          <p>Pregunta ${index + 1}: ${question.question}</p>
          <p>${question.options[0]}: ${percentageOptions[0].toFixed(2)}%</p>
          <p>${question.options[1]}: ${percentageOptions[1].toFixed(2)}%</p>
      `;
    });
  }
  
  // Cargar la primera pregunta al cargar la página
  loadQuestion();
  