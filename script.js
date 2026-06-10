// Banco de Dados das Perguntas do Quiz
const quizData = [
    {
        question: "Qual das práticas abaixo ajuda a reter o carbono no solo e evitar a erosão hídrica?",
        options: [
            "Queimada controlada",
            "Plantio Direto sobre a palha",
            "Uso intensivo de arado comum",
            "Irrigação por inundação contínua"
        ],
        correct: 1
    },
    {
        question: "De que maneira os drones auxiliam diretamente na preservação ambiental no campo?",
        options: [
            "Substituindo tratores nas colheitas pesadas",
            "Espantando aves migratórias das plantações",
            "Mapeando pragas para aplicar insumos apenas onde é necessário",
            "Produzindo chuva artificial em tempos de seca extrema"
        ],
        correct: 2
    },
    {
        question: "Qual o principal objetivo da rotação de culturas?",
        options: [
            "Mudar os maquinários de lugar a cada safra",
            "Alternar espécies para quebrar ciclos de pragas e nutrir o solo",
            "Vender produtos apenas para o mercado internacional",
            "Acelerar o crescimento das plantas usando luz artificial"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos da Interface
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const questionContainer = document.getElementById("question-container");

// Inicialização do Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    nextButton.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    resetOptions();
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

function resetOptions() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedButton, index) {
    const correctAnswer = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Desabilita cliques repetidos
    allButtons.forEach(btn => btn.disabled = true);

    if (index === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        allButtons[correctAnswer].classList.add("correct"); // Mostra a certa
    }

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        nextButton.classList.add("hidden");
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreText.innerText = `Você acertou ${score} de ${quizData.length} perguntas sobre o agro sustentável!`;
}

function restartQuiz() {
    startQuiz();
}

// Executa o quiz ao carregar a página
window.onload = startQuiz;
