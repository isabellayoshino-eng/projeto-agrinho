// ==========================
// Animação de seções ao scroll
// ==========================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));


// ==========================
// Gráfico dos desafios ambientais
// ==========================
const ctx = document.getElementById('desafiosChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Poluição Hídrica', 'Desmatamento', 'Degradação do Solo', 'Mudanças Climáticas', 'Desperdício de Recursos'],
        datasets: [{
            label: 'Impacto (em índice)',
            data: [80, 70, 65, 75, 60],
            backgroundColor: ['#4caf50','#66bb6a','#81c784','#a5d6a7','#c8e6c9']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Principais desafios ambientais no agronegócio'
            }
        }
    }
});


// ==========================
// Quiz Interativo
// ==========================
const quizData = [
    {
        question: "Qual prática ajuda a economizar água na agricultura?",
        options: ["Plantio direto", "Irrigação inteligente", "Desmatamento", "Uso de agrotóxicos"],
        answer: "Irrigação inteligente"
    },
    {
        question: "O que é agricultura de precisão?",
        options: ["Uso de drones e sensores", "Desmatamento controlado", "Queima de resíduos", "Uso de fertilizantes químicos apenas"],
        answer: "Uso de drones e sensores"
    },
    {
        question: "Qual técnica melhora a fertilidade do solo?",
        options: ["Rotação de culturas", "Uso excessivo de pesticidas", "Erosão controlada", "Extração mineral"],
        answer: "Rotação de culturas"
    }
];

let currentQuestion = 0;

function loadQuiz(){
    const quizContainer = document.getElementById("quizContent");
    quizContainer.innerHTML = "";

    const q = quizData[currentQuestion];
    const questionEl = document.createElement("h4");
    questionEl.textContent = q.question;
    quizContainer.appendChild(questionEl);

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("quiz-option");
        btn.onclick = () => selectAnswer(btn, option);
        quizContainer.appendChild(btn);
    });
}

function selectAnswer(btn, selected){
    const correct = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll(".quiz-option");
    buttons.forEach(b => b.disabled = true);

    if(selected === correct){
        btn.classList.add("correct");
    } else {
        btn.classList.add("incorrect");
        buttons.forEach(b => {
            if(b.textContent === correct){
                b.classList.add("correct");
            }
        });
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = currentQuestion < quizData.length - 1 ? "Próxima" : "Finalizar Quiz";
    nextBtn.onclick = () => {
        currentQuestion++;
        if(currentQuestion < quizData.length){
            loadQuiz();
        } else {
            document.getElementById("quizContent").innerHTML = "<h4>Parabéns! Você concluiu o quiz.</h4>";
        }
    };
    document.getElementById("quizContent").appendChild(nextBtn);
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuiz();
});
