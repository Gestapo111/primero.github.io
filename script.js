function calculateScore() {
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
