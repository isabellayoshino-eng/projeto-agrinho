document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. ANIMAÇÕES DE ROLAGEM (SCROLL EFFECT)
       ========================================================================== */
    const faders = document.querySelectorAll('.fade-in');
    const fillBars = document.querySelectorAll('.chart-fill');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Ativa o surgimento visual da seção
            entry.target.classList.add('visible');
            
            // Se a seção de dados do agro surgir, dispara o preenchimento dos gráficos
            if(entry.target.id === 'importancia') {
                fillBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }
            
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    /* ==========================================================================
       2. LÓGICA DO QUIZ INTERATIVO
       ========================================================================== */
    const quizData = [
        {
            question: "Qual tecnologia ajuda a evitar o desperdício aplicando recursos apenas no local necessário?",
            answers: ["Trator convencional", "Agricultura de Precisão", "Arado manual", "Queimada controlada"],
            correct: 1
        },
        {
            question: "O que é rotação de culturas?",
            answers: ["Girar o trator no campo de forma rápida", "Mudar o tipo de planta plantada na mesma área para proteger o solo", "Vender os produtos colhidos em locais diferentes", "Plantar apenas soja continuamente o ano todo"],
            correct: 1
        },
        {
            question: "Como o agronegócio sustentável contribui para as futuras gerações?",
            answers: ["Esgotando os recursos de água rapidamente", "Produzindo alimentos em abundância sem destruir o meio ambiente", "Focando exclusivamente no lucro financeiro imediato", "Abandonando o uso de tecnologias ecológicas"],
            correct: 1
        }
    ];

    let currentQuestionIndex = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-btn");

    function startQuiz() {
        currentQuestionIndex = 0;
        nextButton.innerText = "Próxima Pergunta";
        nextButton.onclick = moveToNext;
        showQuestion();
    }

    function showQuestion() {
        resetQuizState();
        let currentQuestion = quizData[currentQuestionIndex];
        questionText.innerText = currentQuestion.question;

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.classList.add("quiz-option");
            button.addEventListener("click", () => selectAnswer(index, currentQuestion.correct));
            optionsContainer.appendChild(button);
        });
    }

    function resetQuizState() {
        nextButton.style.display = "none";
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    function selectAnswer(selectedIndex, correctIndex) {
        const buttons = optionsContainer.querySelectorAll(".quiz-option");
        buttons.forEach((button, index) => {
            button.disabled = true; // Impede novos cliques na mesma pergunta
            
            if (index === correctIndex) {
                button.classList.add("correct"); // Destaca a correta em verde
            }
            if (index === selectedIndex && selectedIndex !== correctIndex) {
                button.classList.add("incorrect"); // Destaca a errada escolhida em vermelho
            }
        });

        nextButton.style.display = "block";
    }

    function moveToNext() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            questionText.innerText = "Parabéns! Você completou o Quiz do Agrinho 2026 e entendeu a importância do equilíbrio sustentável!";
            resetQuizState();
            nextButton.innerText = "Refazer Quiz";
            nextButton.style.display = "block";
            nextButton.onclick = startQuiz;
        }
    }

    // Inicializa o quiz ao carregar a página
    if (questionText && optionsContainer && nextButton) {
        startQuiz();
    }
});
