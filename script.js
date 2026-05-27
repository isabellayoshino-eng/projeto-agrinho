const quizData = [
    {
        question: "1. Com base nos dados da Embrapa, qual o percentual aproximado de áreas nativas preservadas e de baixo carbono mantidas pelos produtores?",
        options: [
            "A) Cerca de 10%, concentrados apenas no Sul.",
            "B) Aproximadamente 66%, aliando preservação ambiental e novas técnicas rurais.",
            "C) Mais de 95%, paralisando as atividades comerciais rurais.",
            "D) Nenhuma área verde é preservada no cenário produtivo nacional."
        ],
        correct: 1
    },
    {
        question: "2. Qual técnica une o aumento da eficiência produtiva à conservação biológica direta e diminuição do desgaste do solo?",
        options: [
            "A) Queima contínua da palhada residual pós-colheita.",
            "B) Monocultura intensiva sem períodos de descanso para a terra.",
            "C) Sistema de Plantio Direto e rotação estratégica de culturas.",
            "D) Uso desmedido e preventivo de defensivos agroquímicos."
        ],
        correct: 2
    },
    {
        question: "3. No contexto da triagem e destinação pós-colheita, qual o principal risco do descarte inadequado de óleos, químicos e lixo eletrônico?",
        options: [
            "A) Contaminação severa do solo produtivo e dos aquíferos/lençóis freáticos.",
            "B) Aceleração do crescimento espontâneo de árvores frutíferas nativas.",
            "C) Redução do preço de revenda dos maquinários pesados da fazenda.",
            "D) Nenhum risco prático, pois o solo rural absorve qualquer componente industrial."
        ],
        correct: 0
    },
    {
        question: "4. Qual o papel prático de fontes limpas de energia, como a eólica ou solar, inseridas no ambiente agrícola moderno?",
        options: [
            "A) Reduzir o crescimento da plantação criando sombras excessivas.",
            "B) Aumentar o consumo de combustíveis fósseis no uso diário de tratores.",
            "C) Diversificar a matriz, reduzir emissões de CO2 e trazer sustentabilidade de insumos.",
            "D) Eliminar completamente a necessidade de irrigar as plantas da lavoura."
        ],
        correct: 2
    }
];

let currentQuestionIndex = 0;

const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");
const quizWindow = document.getElementById("quiz-window");
const quizResult = document.getElementById("quiz-result");
const resultText = document.getElementById("result-text");
const btnRestart = document.getElementById("btn-restart");

function loadQuestion() {
    optionsGrid.innerHTML = "";
    
    if (currentQuestionIndex < quizData.length) {
        const currentQuiz = quizData[currentQuestionIndex];
        questionText.textContent = currentQuiz.question;

        currentQuiz.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.classList.add("btn-opt", `opt-${index}`);
            button.textContent = option;
            
            button.addEventListener("click", () => checkAnswer(index, button));
            optionsGrid.appendChild(button);
        });
    } else {
        showResults();
    }
}

function checkAnswer(selectedIndex, clickedButton) {
    const correctIndex = quizData[currentQuestionIndex].correct;

    if (selectedIndex === correctIndex) {
        currentQuestionIndex++;
        setTimeout(() => {
            loadQuestion();
        }, 200);
    } else {
        clickedButton.classList.add("wrong");
    }
}

function showResults() {
    quizWindow.style.display = "none";
    quizResult.style.display = "block";
    resultText.innerHTML = "<strong>🏆 Excelente Trabalho!</strong><br>Você passou por todas as fases, analisou a triagem de resíduos, o manejo do solo, as energias renováveis e provou ser um mestre da Sustentabilidade Agrícola!";
}

btnRestart.addEventListener("click", () => {
    currentQuestionIndex = 0;
    quizResult.style.display = "none";
    quizWindow.style.display = "block";
    loadQuestion();
});

document.addEventListener("DOMContentLoaded", loadQuestion);
