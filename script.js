// Capturas de estado e telas do módulo de Simulado
const startWindow = document.getElementById('start-window');
const quizWindow = document.getElementById('quiz-window');
const resultWindow = document.getElementById('result-window');

// Controladores de Interface
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const progressText = document.getElementById('progress-text');
const timerBox = document.getElementById('timer-box');
const timerCount = document.getElementById('timer-count');
const finalScoreText = document.getElementById('final-score');
const feedbackMessage = document.getElementById('feedback-message');

const questionCards = document.querySelectorAll('.question-card');

let currentQuestionIndex = 0;
let totalScore = 0;
let timeLeft = 15;
let timerInterval = null;
const totalQuestions = questionCards.length;

// Ação: Disparar início do Simulado
startButton.addEventListener('click', () => {
    startWindow.classList.remove('active');
    quizWindow.classList.add('active');
    loadQuestion(0);
});

// Vincula o tratamento de clique às opções de resposta
function initializeQuizLogic() {
    questionCards.forEach((card) => {
        const options = card.querySelectorAll('.option-item');
        const correctAnswer = card.getAttribute('data-correct');

        options.forEach((option) => {
            option.addEventListener('click', () => {
                clearInterval(timerInterval); // Trava o tempo imediatamente após a resposta
                const selected = option.getAttribute('data-index');
                
                if (selected === correctAnswer) {
                    option.classList.add('correct');
                    totalScore++;
                } else {
                    option.classList.add('wrong');
                    card.querySelector(`[data-index="${correctAnswer}"]`).classList.add('correct');
                }

                lockOptions(card);
                nextButton.style.display = 'block';
            });
        });
    });
}

// Renderiza a pergunta atual e ativa o contador correspondente
function loadQuestion(index) {
    questionCards.forEach(card => card.classList.remove('active'));
    questionCards[index].classList.add('active');
    
    progressText.textContent = `Pergunta ${index + 1} de ${totalQuestions}`;
    nextButton.style.display = 'none';
    
    runCountdown();
}

// Gerenciamento visual do cronômetro de 15s por pergunta
function runCountdown() {
    timeLeft = 15;
    timerCount.textContent = timeLeft;
    timerBox.className = 'timer-normal';
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerCount.textContent = timeLeft;

        // Controle dinâmico das classes de cor com base nos limites críticos
        if (timeLeft <= 8 && timeLeft > 4) {
            timerBox.className = 'timer-warn';
        } else if (timeLeft <= 4) {
            timerBox.className = 'timer-crit';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            expireTime();
        }
    }, 1000);
}

// Evento disparado caso o cronômetro chegue a zero
function expireTime() {
    const currentCard = questionCards[currentQuestionIndex];
    const correctAnswer = currentCard.getAttribute('data-correct');
    
    // Identifica e marca o acerto correto em verde sem somar ponto
    currentCard.querySelector(`[data-index="${correctAnswer}"]`).classList.add('correct');
    
    lockOptions(currentCard);
    nextButton.style.display = 'block';
}

// Bloqueia cliques adicionais no bloco de questões atual
function lockOptions(card) {
    const options = card.querySelectorAll('.option-item');
    options.forEach(opt => opt.classList.add('disabled'));
}

// Transição sequencial entre questões
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        loadQuestion(currentQuestionIndex);
    } else {
        clearInterval(timerInterval);
        displayScoreboard();
    }
});

// Gera o balanço final de aproveitamento dentro do módulo
function displayScoreboard() {
    quizWindow.classList.remove('active');
    resultWindow.classList.add('active');
    
    finalScoreText.textContent = `Você acertou ${totalScore} de ${totalQuestions} perguntas.`;
    
    if (totalScore === totalQuestions) {
        feedbackMessage.textContent = "Excelente! Seu domínio sobre as diretrizes do Agro Forte está completo.";
    } else if (totalScore >= 2) {
        feedbackMessage.textContent = "Bom desempenho! Sua base teórica sobre preservação e campo é sólida.";
    } else {
        feedbackMessage.textContent = "Recomendamos ler com mais atenção os blocos informativos laterais antes de tentar novamente.";
    }
}

// Executa o recarregamento completo do simulado para nova tentativa
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
    loadQuestion(0);
});

// Acionamento inicial da lógica estrutural
initializeQuizLogic();
