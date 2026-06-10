// Controle do Menu Sanduíche Mobile
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Remove o menu expansível de smartphones ao clicar em uma seção
document.querySelectorAll('#nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// Banco de Dados do Quiz Temático
const quizData = [
    {
        question: "Qual técnica evita a erosão plantando diretamente sobre os resíduos da colheita anterior?",
        options: ["Aragem profunda", "Plantio Direto", "Queimada controlada", "Monocultura"],
        correct: 1
    },
    {
        question: "Como os drones auxiliam diretamente a sustentabilidade no campo?",
        options: ["Substituindo tratores", "Aplicando insumos apenas onde há necessidade real", "Espantando animais silvestres", "Aumentando o tempo de colheita"],
        correct: 1
    },
    {
        question: "Qual a função da Mata Ciliar nas propriedades agrícolas?",
        options: ["Servir de lenha", "Proteger nascentes e evitar o assoreamento de rios", "Embelezar a fazenda apenas", "Aumentar a área de pastagem"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Renderização das perguntas na tela
function loadQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const resultBox = document.getElementById('quiz-result');
    
    if (currentQuestion < quizData.length) {
        quizBox.style.display = "block";
        resultBox.style.display = "none";
        
        const q = quizData[currentQuestion];
        document.getElementById('quiz-question').innerText = q.question;
        
        const optionsDiv = document.getElementById('quiz-options');
        optionsDiv.innerHTML = '';
        
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(index, btn);
            optionsDiv.appendChild(btn);
        });
    } else {
        quizBox.style.display = "none";
        resultBox.style.display = "block";
        document.getElementById('quiz-score').innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
    }
}

// Validação se a resposta está certa ou errada
function checkAnswer(selected, button) {
    const correct = quizData[currentQuestion].correct;
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(opt => opt.disabled = true);
    
    if (selected === correct) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
        options[correct].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1500);
}

// Reseta o estado do quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

// Inicializador automático
window.onload = loadQuestion;
