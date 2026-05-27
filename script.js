const quizData = [
    {
        question: "1. Com base nos dados da Embrapa, qual o percentual aproximado de áreas nativas preservadas e de baixo carbono mantidas pelos produtores rurais?",
        options: [
            "A) Cerca de 10%, concentrados apenas no Sul rústico.",
            "B) Aproximadamente 66%, aliando preservação florestal e novas técnicas ambientais.",
            "C) Mais de 95%, interrompendo qualquer atividade comercial produtiva.",
            "D) Nenhuma área verde é preservada no cenário produtivo nacional atual."
        ],
        correct: 1
    },
    {
        question: "2. Qual técnica une o aumento da eficiência produtiva à conservação biológica direta e diminuição do desgaste físico do solo?",
        options: [
            "A) Queima contínua da palhada residual pós-colheita.",
            "B) Monocultura intensiva sem períodos de descanso para a terra.",
            "C) Sistema de Plantio Direto e rotação estratégica de culturas.",
            "D) Uso desmedido e preventivo de defensivos agroquímicos."
        ],
        correct: 2
    },
    {
        question: "3. No contexto da triagem de descarte, qual o principal risco do descarte inadequado de óleos, químicos e lixo eletrônico (e-waste)?",
        options: [
            "A) Contaminação severa do solo produtivo e dos aquíferos/lençóis freáticos.",
            "B) Aceleração do crescimento espontâneo de árvores frutíferas nativas.",
            "C) Redução do preço de revenda dos maquinários pesados da fazenda.",
            "D) Nenhum risco prático, pois o solo rural limpa qualquer resíduo industrial."
        ],
        correct: 0
    },
    {
        question: "4. Qual a função de fontes limpas de energia, como as turbinas eólicas e painéis solares, instaladas nas fazendas?",
        options: [
            "A) Reduzir o crescimento da plantação criando sombras excessivas.",
            "B) Aumentar o consumo de combustíveis fósseis no uso diário de tratores.",
            "C) Diversificar a matriz, diminuir a pegada de carbono e trazer autossuficiência.",
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
        }, 250); // Transição suave ao acertar
    } else {
        clickedButton.classList.add("wrong"); // Fica vermelho se errar
    }
}

function showResults() {
    quizWindow.style.display = "none";
    quizResult.style.display = "block";
    resultText.innerHTML = "<strong>🏆 Excelente Trabalho!</strong><br>Você passou por todas as etapas, analisou a triagem de resíduos, o manejo do solo, as energias eólicas renováveis e provou ser um mestre da Sustentabilidade!";
}

btnRestart.addEventListener("click", () => {
    currentQuestionIndex = 0;
    quizResult.style.display = "none";
    quizWindow.style.display = "block";
    loadQuestion();
});

document.addEventListener("DOMContentLoaded", loadQuestion);
