// Gerenciamento de Telas
const startWindow = document.getElementById('start-window');
const quizWindow = document.getElementById('quiz-window');
const resultWindow = document.getElementById('result-window');

// Botões e Indicadores
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const progressText = document.getElementById('progress-text');
const timerCount = document.getElementById('timer-count');
const finalScoreText = document.getElementById('final-score');
const feedbackMessage = document.getElementById('feedback-message');

const questionCards = document.querySelectorAll('.question-card');

let currentQuestionIndex = 0;
let totalScore = 0;
let timeLeft = 15;
let timerInterval = null;
const totalQuestions = questionCards.length;

// Evento: Iniciar o Quiz
startButton.addEventListener('click', () => {
    startWindow.classList.remove('active');
    quizWindow.classList.add('active');
    showQuestion(0);
});

// Inicialização dos cliques nas alternativas
function setupOptions() {
    questionCards.forEach((card) => {
        const options = card.querySelectorAll('.option-item');
        const correctAnswer = card.getAttribute('data-correct');

        options.forEach((option) => {
            option.addEventListener('click', () => {
                clearInterval(timerInterval); // Para o tempo imediatamente ao responder
                const selectedAnswer = option.getAttribute('data-index');
                
                if (selectedAnswer === correctAnswer) {
                    option.classList.add('correct');
                    totalScore++;
                } else {
                    option.classList.add('wrong');
                    card.querySelector(`[data-index="${correctAnswer}"]`).classList.add('correct');
                }

                disableOptions(card);
                nextButton.style.display = 'block';
            });
        });
    });
}

// Controla a exibição e reinicia o cronômetro da pergunta específica
function showQuestion(index) {
    questionCards.forEach(card => card.classList.remove('active'));
    questionCards[index].classList.add('active');
    
    progressText.textContent = `Pergunta ${index + 1} de ${totalQuestions}`;
    nextButton.style.display = 'none';
    
    startTimer();
}

// Lógica do Cronômetro de 15 segundos
function startTimer() {
    timeLeft = 15;
    timerCount.textContent = timeLeft;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerCount.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Ação quando o tempo esgota
function handleTimeOut() {
    const currentCard = questionCards[currentQuestionIndex];
    const correctAnswer = currentCard.getAttribute('data-correct');
    
    // Revela a resposta correta em verde
    currentCard.querySelector(`[data-index="${correctAnswer}"]`).classList.add('correct');
    
    disableOptions(currentCard);
    nextButton.style.display = 'block';
}

// Bloqueia interações após escolha ou estouro do tempo
function disableOptions(card) {
    const options = card.querySelectorAll('.option-item');
    options.forEach(opt => opt.classList.add('disabled'));
}

// Avançar ou Concluir
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        showQuestion(currentQuestionIndex);
    } else {
        clearInterval(timerInterval);
        showResults();
    }
});

// Exibe a tela de pontuação
function showResults() {
    quizWindow.classList.remove('active');
    resultWindow.classList.add('active');
    
    finalScoreText.textContent = `Você acertou ${totalScore} de ${totalQuestions} perguntas.`;
    
    if (totalScore === totalQuestions) {
        feedbackMessage.textContent = "Excelente aproveitamento! Seu conhecimento sobre o Agro Forte é exemplar.";
    } else if (totalScore >= 2) {
        feedbackMessage.textContent = "Bom resultado! Você possui uma base sólida sobre o desenvolvimento sustentável.";
    } else {
        feedbackMessage.textContent = "Continue revisando os materiais informativos do campo para aprimorar seus conhecimentos.";
    }
}

// Reinicia todas as variáveis e limpa modificações visuais
restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    totalScore = 0;
    
    questionCards.forEach((card) => {
        card.classList.remove('active');
        const options = card.querySelectorAll('.option-item');
        options.forEach(option => option.classList.remove('correct', 'wrong', 'disabled'));
    });

    resultWindow.classList.remove('active');
    quizWindow.classList.add('active');
    showQuestion(0);
});

// Inicializa escopo do quiz ao carregar o arquivo
setupOptions();
