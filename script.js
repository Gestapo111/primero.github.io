function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestions() {
    const questionIds = [
        'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10',
        'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20',
        'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30',
        'q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q37', 'q38', 'q39', 'q40'
    ];

    questionIds.forEach(questionId => {
        const container = document.getElementById(`${questionId}-answers`);
        const answers = Array.from(container.querySelectorAll('label'));
        
        // Shuffle the answers
        shuffleArray(answers);

        // Re-attach shuffled answers to the container
        answers.forEach(answer => {
            const input = container.querySelector(`input[id="${answer.htmlFor}"]`);
            container.appendChild(input);
            container.appendChild(answer);
            container.appendChild(document.createElement('br'));
        });
    });
}

function calculateScore() {
    // Obtener el número de intentos del almacenamiento local
    let attempts = parseInt(localStorage.getItem('quizAttempts')) || 0;

    // Verificar el límite de intentos
    if (attempts >= 5) {
        document.getElementById('score').innerHTML = '<p>Has alcanzado el máximo número de intentos permitidos.</p>';
        return;
    }

    // Incrementar el número de intentos y guardarlo en el almacenamiento local
    localStorage.setItem('quizAttempts', attempts + 1);

    const answers = {
        q1: 'a', q2: 'a', q3: 'a', q4: 'a', q5: 'a',
        q6: 'a', q7: 'a', q8: 'a', q9: 'a', q10: 'a',
        q11: 'a', q12: 'a', q13: 'a', q14: 'a', q15: 'a',
        q16: 'a', q17: 'a', q18: 'a', q19: 'a', q20: 'a',
        q21: 'a', q22: 'a', q23: 'a', q24: 'a', q25: 'a',
        q26: 'a', q27: 'a', q28: 'a', q29: 'a', q30: 'a',
        q31: 'a', q32: 'a', q33: 'a', q34: 'a', q35: 'a',
        q36: 'a', q37: 'a', q38: 'a', q39: 'a', q40: 'a'
    };

    let score = 0;
    const totalQuestions = 40;
    const pointsPerQuestion = 0.25;
    let resultOutput = '';
    const form = document.getElementById('quizForm');

    for (let i = 1; i <= totalQuestions; i++) {
        const questionId = `q${i}`;
        const selectedAnswer = form.querySelector(`input[name="${questionId}"]:checked`);
        const correctAnswer = answers[questionId];

        if (selectedAnswer) {
            const answerValue = selectedAnswer.value;
            if (answerValue === correctAnswer) {
                score += pointsPerQuestion;
                resultOutput += `<p>Pregunta ${i}: <span class="correct">Correcta</span></p>`;
            } else {
                resultOutput += `<p>Pregunta ${i}: <span class="incorrect">Incorrecta</span></p>`;
            }
        } else {
            resultOutput += `<p>Pregunta ${i}: <span class="not-answered">No respondida</span></p>`;
        }
    }

    const totalPoints = totalQuestions * pointsPerQuestion;
    const percentage = (score / totalPoints) * 100;

    document.getElementById('score').innerHTML = `
        <p>Tu nota obtenida es: ${score.toFixed(2)} de ${totalPoints} (${percentage.toFixed(2)}%)</p>
        ${resultOutput}
    `;
}

// Inicializar el cuestionario con respuestas mezcladas
window.onload = displayQuestions;
