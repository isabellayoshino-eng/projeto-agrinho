/* --- ROLAGEM E REVELAÇÃO SUAVE (SCROLL REVEAL EFFECT) --- */
window.addEventListener('scroll', revealElements);

function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
            
            // Dispara o preenchimento dos gráficos quando o painel fica visível
            if(element.id === 'dados') {
                triggerCharts();
            }
        }
    });
}

function triggerCharts() {
    const fills = document.querySelectorAll('.bar-fill[data-width]');
    fills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-width');
    });
}

/* --- ALTERNAÇÃO DINÂMICA DE ABAS (TABS LOGIC) --- */
function switchTab(event, panelId) {
    const panels = document.querySelectorAll('.tab-panel');
    const triggers = document.querySelectorAll('.tab-trigger');

    panels.forEach(panel => panel.classList.remove('active'));
    triggers.forEach(trigger => trigger.classList.remove('active'));

    document.getElementById(panelId).classList.add('active');
    event.currentTarget.classList.add('active');
}

/* --- CONTADORES NUMÉRICOS ANIMADOS --- */
function startCounter(id, start, end, suffix, duration) {
    let obj = document.getElementById(id);
    if (!obj) return;
    let current = start;
    let range = end - start;
    let increment = end > start ? 1 : -1;
    let step = Math.abs(Math.floor(duration / range));
    step = Math.max(step, 10);
    
    let timer = setInterval(() => {
        current += Math.ceil(range / (duration / 30));
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            obj.textContent = end + suffix;
        } else {
            obj.textContent = current + suffix;
        }
    }, 30);
}

// Inicializadores numéricos disparados pós-carregamento controlado
setTimeout(() => {
    startCounter("m1", 0, 18, " Milhões", 2000);
    startCounter("m2", 0, 40, "%", 2000);
    startCounter("m3", 0, 520, "+", 2000);
    revealElements(); // Roda checagem posicional imediata
}, 300);

/* --- SISTEMA DINÂMICO DO QUIZ --- */
const quizQuestions = [
    {
        q: "Qual o principal benefício do Sistema de Plantio Direto para o solo rural?",
        options: [
            "Expor as camadas profundas ao calor do sol", 
            "Reduzir a erosão ao manter a cobertura de palhada", 
            "Aumentar a compactação mecânica", 
            "Eliminar a necessidade de rotação de culturas"
        ],
        answer: 1
    },
    {
        q: "Como os drones e sensores colaboram para diminuir a contaminação ambiental?",
        options: [
            "Aumentando o consumo hídrico geral", 
            "Modificando geneticamente as sementes em tempo real", 
            "Permitindo aplicar defensivos agrícolas apenas onde há necessidade real", 
            "Substituindo completamente o trabalho dos agricultores"
        ],
        answer: 2
    },
    {
        q: "Por que conservar as Matas Ciliares e as cabeceiras das nascentes é obrigatório?",
        options: [
            "Para secar os rios mais rápido", 
            "Para evitar o assoreamento e garantir a pureza das bacias de água", 
            "Apenas para fins estéticos da fazenda", 
            "Para impedir a circulação de fauna silvestre"
        ],
        answer: 1
    }
];

let currentQuestionIdx = 0;
let totalScore = 0;

function loadQuestion() {
    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const progressEl = document.getElementById("quiz-progress");

    if (!questionEl || !optionsEl) return;

    feedbackEl.innerText = "";
    optionsEl.innerHTML = "";

    // Atualiza barra de progresso do jogo
    let progressPct = (currentQuestionIdx / quizQuestions.length) * 100;
    progressEl.style.width = `${progressPct}%`;

    if (currentQuestionIdx < quizQuestions.length) {
        let currentItem = quizQuestions[currentQuestionIdx];
        questionEl.innerText = `${currentQuestionIdx + 1}. ${currentItem.q}`;

        currentItem.options.forEach((opt, idx) => {
            let btn = document.createElement("button");
            btn.innerText = opt;
            btn.classList.add("quiz-btn");
            btn.addEventListener("click", () => evaluateAnswer(idx, btn));
            optionsEl.appendChild(btn);
        });
    } else {
        progressEl.style.width = "100%";
        questionEl.innerText = "Desafio Concluído com Sucesso!";
        optionsEl.innerHTML = `<p style='font-size:1.1rem; text-align:center; padding:10px 0;'>Você acertou <strong>${totalScore} de ${quizQuestions.length}</strong> questões.</p>`;
        feedbackEl.innerText = "Parabéns! Continue defendendo o Equilíbrio Sustentável no Campo!";
        feedbackEl.style.color = "var(--emerald)";
    }
}

function evaluateAnswer(selectedIdx, clickedBtn) {
    const feedbackEl = document.getElementById("quiz-feedback");
    const allButtons = document.querySelectorAll(".quiz-btn");
    let correctAnswerIdx = quizQuestions[currentQuestionIdx].answer;

    // Bloqueia cliques adicionais nas outras opções enquanto exibe o resultado
    allButtons.forEach(b => b.style.pointerEvents = "none");

    if (selectedIdx === correctAnswerIdx) {
        clickedBtn.classList.add("correct");
        feedbackEl.innerText = "Excelente! Resposta correta! ✨";
        feedbackEl.style.color = "var(--emerald)";
        totalScore++;
    } else {
        clickedBtn.classList.add("wrong");
        allButtons[correctAnswerIdx].classList.add("correct");
        feedbackEl.innerText = "Resposta incorreta. O campo exige atenção! 🔄";
        feedbackEl.style.color = "var(--earth)";
    }

    currentQuestionIdx++;
    setTimeout(loadQuestion, 2200);
}

// Iniciar aplicação de quiz após carregamento estrutural completo da árvore DOM
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});
