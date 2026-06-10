// Seleção de elementos da interface
const questionCards = document.querySelectorAll('.question-card');
const nextButton = document.getElementById('next-btn');
const progressText = document.getElementById('progress-text');
const quizWindow = document.getElementById('quiz-window');
const resultWindow = document.getElementById('result-window');
const finalScoreText = document.getElementById('final-score');
const feedbackMessage = document.getElementById('feedback-message');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let totalScore = 0;
const totalQuestions = questionCards.length;

// Configuração inicial do sistema de respostas
function setupOptions() {
    questionCards.forEach((card) => {
        const options = card.querySelectorAll('.option-item');
        const correctAnswer = card.getAttribute('data-correct');

        options.forEach((option) => {
            option.addEventListener('click', () => {
                const selectedAnswer = option.getAttribute('data-index');
                
                // Sistema de cores (verde para acerto, vermelho para erro)
                if (selectedAnswer === correctAnswer) {
                    option.classList.add('correct');
                    totalScore++;
                } else {
                    option.classList.add('wrong');
                    // Revela a alternativa certa para o aluno aprender
                    card.querySelector(`[data-index="${correctAnswer}"]`).classList.add('correct');
                }

                // Desativa as outras opções para impedir múltiplos cliques
                options.forEach(opt => opt.classList.add('disabled'));
                
                // Exibe o botão para avançar
                nextButton.style.display = 'block';
            });
        });
    });
}

// Avança para a próxima pergunta ou encerra o quiz
nextButton.addEventListener('click', () => {
    questionCards[currentQuestionIndex].classList.remove('active');
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        questionCards[currentQuestionIndex].classList.add('active');
        progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${totalQuestions} 📋`;
        nextButton.style.display = 'none';
    } else {
        showResults();
    }
});

// Processa e apresenta a pontuação final
function showResults() {
    quizWindow.style.display = 'none';
    resultWindow.style.display = 'block';
    finalScoreText.textContent = `Você acertou ${totalScore} de ${totalQuestions} perguntas! 🎯`;
    
    if (totalScore === totalQuestions) {
        feedbackMessage.textContent = "Excelente! Você conhece tudo sobre o Agro Forte! 🥇🏆";
    } else if (totalScore >= 2) {
        feedbackMessage.textContent = "Bom trabalho! O agro sustenta o nosso futuro. 🌱👍";
    } else {
        feedbackMessage.textContent = "Continue estudando sobre o campo para fortalecer o nosso agro! 📚🚜";
    }
}

// Reseta o estado do quiz para reiniciar
restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    totalScore = 0;
    
    questionCards.forEach((card, index) => {
        card.classList.remove('active');
        if(index === 0) card.classList.add('active');
        
        const options = card.querySelectorAll('.option-item');
        options.forEach((option) => {
            option.classList.remove('correct', 'wrong', 'disabled');
        });
    });

    progressText.textContent = `Pergunta 1 de ${totalQuestions} 📋`;
    nextButton.style.display = 'none';
    resultWindow.style.display = 'none';
    quizWindow.style.display = 'block';
});

// Inicialização imediata do script
setupOptions();
