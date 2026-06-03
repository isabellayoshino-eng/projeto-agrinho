// Menu Responsivo Mobile
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link mobile
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Dados do Quiz Educativo
const quizData = [
    {
        question: "Qual tecnologia ajuda a monitorar a saúde das plantações lá do alto?",
        options: ["Tratores antigos", "Drones agrícolas", "Enxadas manuais", "Espantalhos eletrônicos"],
        correct: 1
    },
    {
        question: "A prática de alternar plantas na mesma área para descansar o solo chama-se:",
        options: ["Desmatamento", "Monocultura", "Rotação de culturas", "Queimada controlada"],
        correct: 2
    },
    {
        question: "Como a agricultura inteligente economiza água?",
        options: ["Deixando de regar as plantas", "Usando sensores de umidade no solo", "Esperando apenas a chuva cair", "Regando as plantas ao meio-dia"],
        correct: 1
    }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    optionsContainer.innerHTML = '';

    currentQuizData.options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.classList.add('quiz-option');
        btn.innerText = option;
        btn.addEventListener('click', () => selectOption(btn, index));
        optionsContainer.appendChild(btn);
    });
}

function deselectAnswers() {
    nextBtn.style.display = 'none';
}

function selectOption(element, selectedIndex) {
    const correctAnswer = quizData[currentQuiz].correct;
    const options = optionsContainer.querySelectorAll('.quiz-option');
    
    // Impede cliques múltiplos após responder
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if(selectedIndex === correctAnswer) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('incorrect');
        options[correctAnswer].classList.add('correct'); // Mostra a certa
    }
    
    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    currentQuiz++;
    if(currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        document.getElementById('quiz-window').innerHTML = `
            <div style="text-align:center;">
                <i class="fa-solid fa-trophy" style="font-size: 3rem; color: var(--amarelo-sol); margin-bottom:15px;"></i>
                <h3>Você concluiu o Quiz!</h3>
                <p style="margin: 15px 0; font-size:1.2rem;">Acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.</p>
                <button onclick="location.reload()" class="btn-cta" style="padding:8px 20px; font-size:0.9rem;">Refazer Quiz</button>
            </div>
        `;
    }
});

// Inicia o Quiz
loadQuiz();

// Envio do Formulário de Contato (Simulação)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Muito obrigado por sua participação! Sua mensagem foi enviada com sucesso para a comissão do Agrinho 2026.');
    this.reset();
});
