const quizData = [
    {
        question: "Qual técnica consiste em plantar uma nova cultura sobre a palhada da colheita anterior sem revolver o solo?",
        options: [
            "Aração profunda",
            "Plantio Direto",
            "Queimada controlada",
            "Monocultura contínua"
        ],
        correct: 1
    },
    {
        question: "Como os drones auxiliam na sustentabilidade do agronegócio?",
        options: [
            "Substituindo completamente a necessidade de água",
            "Mapeando lavouras para aplicar insumos apenas onde há necessidade real",
            "Acelerando o crescimento das plantas por magnetismo",
            "Eles não possuem utilidade ecológica"
        ],
        correct: 1
    },
    {
        question: "O que são as chamadas Matas Ciliares?",
        options: [
            "Florestas plantadas para a extração de madeira",
            "Vegetação nativa que fica às margens de rios e nascentes, protegendo-os da erosão",
            "Plantações de grãos geneticamente modificados",
            "Áreas desérticas sem vegetação"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTextElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const quizContent = document.getElementById("quiz-content");
const quizResult = document.getElementById("quiz-result");
const scoreText = document.getElementById("score-text");

function loadQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionTextElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("quiz-btn");
        button.addEventListener("click", () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedBtn, index) {
    const correctAnswerIndex = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll(".quiz-btn");

    allButtons.forEach((btn, btnIndex) => {
        btn.disabled = true;
        if (btnIndex === correctAnswerIndex) {
            btn.classList.add("correct");
        }
    });

    if (index === correctAnswerIndex) {
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    nextButton.style.display = "block";
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
    quizContent.style.display = "none";
    quizResult.style.display = "block";
    scoreText.innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizResult.style.display = "none";
    quizContent.style.display = "block";
    loadQuestion();
}

window.onload = loadQuestion;
