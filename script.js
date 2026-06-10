// Banco de dados das perguntas com temas do Agrinho 2026
const quizData = [
    {
        question: "🚜 Qual tecnologia ajuda a monitorar plantações inteiras voando e gerando dados precisos?",
        options: ["📱 Aplicativos de redes sociais", "🛸 Drones agrícolas com sensores", "📻 Rádios comunitárias do campo"],
        correct: 1
    },
    {
        question: "🌱 O que caracteriza a agricultura sustentável no tema Agro Forte?",
        options: ["💧 Preservar o solo e usar a água de forma inteligente", "🪓 Expandir sem planejamento ambiental", "⏳ Deixar de produzir alimentos para descansar"],
        correct: 0
    },
    {
        question: "🚀 Qual é o principal objetivo do concurso Agrinho 2026?",
        options: ["🏙️ Incentivar a mudança em massa para a cidade grande", "💡 Conectar inovação, educação e a força do campo", "💵 Avaliar apenas lucros financeiros imediatos"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 15;

// Mapeamento de Elementos do DOM
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionNumberText = document.getElementById("question-number");
const timerText = document.getElementById("timer");
const progressFill = document.getElementById("progress-fill");
const resultText = document.getElementById("result-text");

// Evento: Iniciar o Quiz (O Cronômetro só começa AQUI)
startBtn.addEventListener("click", () => {
    startScreen.classList.add("hide");
    questionScreen.classList.remove("hide");
    loadQuestion();
});

// Evento: Reiniciar
restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
});

// Carregar pergunta na tela e disparar cronômetro específico dela
function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timerText.textContent = `⏱️ ${timeLeft}s`;
    
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Atualiza cabeçalhos de progresso
    questionNumberText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    progressFill.style.width = `${((currentQuestionIndex) / quizData.length) * 100}%`;
    questionText.textContent = currentQuestion.question;
    
    // Limpa opções antigas e desenha novas caixas com emojis
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    // Inicia a contagem regressiva apenas após renderizar a pergunta ativa
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = `⏱️ ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion(); // Avança automaticamente se o tempo esgotar
        }
    }, 1000);
}

function selectOption(selectedIndex) {
    clearInterval(timerInterval);
    if (selectedIndex === quizData[currentQuestionIndex].correct) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionScreen.classList.add("hide");
    resultScreen.classList.remove("hide");
    progressFill.style.width = "100%";
    resultText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.<br><br> ${score === quizData.length ? "🟢 Excelente! Seu projeto vai ser nota 10!" : "🟡 Bom trabalho! Revise os tópicos para ficar ainda mais forte!"}`;
}
