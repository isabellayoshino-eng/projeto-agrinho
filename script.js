// --- MENU MOBILE ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('ativo');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('ativo');
    });
});

// --- BANCO DE DADOS DO QUIZ (EXPANDIDO PARA 5 QUESTÕES) ---
const dadosQuiz = [
    {
        pergunta: "Qual das alternativas abaixo é um exemplo de tecnologia aplicada ao agro sustentável?",
        opcoes: [
            "A) Irrigação contínua sem controle técnico.",
            "B) Monitoramento por drones para aplicar água e insumos no local exato.",
            "C) Eliminação completa de toda a vegetação ao redor da plantação."
        ],
        correta: 1,
        feedback: "Certinho! O uso de drones ajuda no mapeamento detalhado, evitando desperdício de insumos e água."
    },
    {
        pergunta: "Como o sistema de Plantio Direto ajuda na conservação ambiental?",
        opcoes: [
            "A) Revirando a terra profundamente todas as semanas.",
            "B) Queimando os restos da colheita anterior para limpar o solo.",
            "C) Mantendo a palhada sobre o solo para protegê-lo da erosão."
        ],
        correta: 2,
        feedback: "Muito bem! A palhada protege a terra contra o impacto da chuva e do vento, mantendo a umidade natural."
    },
    {
        pergunta: "O que significa o termo 'Sucessão Familiar' no contexto do agronegócio?",
        opcoes: [
            "A) A continuidade do trabalho na propriedade rural pelas novas gerações da família.",
            "B) A venda obrigatória da fazenda quando os donos originais ficam idosos.",
            "C) O abandono total das terras para morar exclusivamente nas grandes cidades."
        ],
        correta: 0,
        feedback: "Isso mesmo! A sucessão familiar mantém vivas as tradições do campo com a chegada de novas tecnologias trazidas pelos jovens."
    },
    {
        pergunta: "Qual fonte de energia limpa tem crescido rapidamente nas fazendas para reduzir a pegada de carbono?",
        opcoes: [
            "A) Geradores movidos a óleo diesel pesado.",
            "B) Painéis de energia solar fotovoltaica.",
            "C) Queima de carvão mineral em caldeiras."
        ],
        correta: 1,
        feedback: "Excelente! A energia solar aproveita o grande espaço aberto do campo para produzir eletricidade 100% limpa."
    },
    {
        pergunta: "Para que serve a 'Rotação de Culturas' praticada pelos produtores?",
        opcoes: [
            "A) Alternar os tipos de plantas cultivadas para preservar os nutrientes do solo.",
            "B) Mudar os tratores de lugar para que trabalhem em círculos.",
            "C) Plantar a mesma cultura durante 20 anos seguidos sem interrupção."
        ],
        correta: 0,
        feedback: "Exatamente! Alternar plantas (como soja e milho) melhora a fertilidade do solo e quebra naturalmente o ciclo de pragas."
    }
];

// --- VARIÁVEIS DE ESTADO DO QUIZ ---
let indicePerguntaAtual = 0;
let pontuacao = 0;
let tempoRestante = 15;
let cronometroIntervalo;
const TEMPO_LIMITE = 15;

// --- ELEMENTOS DO DOM ---
const elementoPergunta = document.getElementById('pergunta-texto');
const containerOpcoes = document.getElementById('opcoes-container');
const elementoFeedback = document.getElementById('feedback-texto');
const elementoPasso = document.getElementById('placar-passo');
const btnProximo = document.getElementById('btn-proximo');
const elementoTempo = document.getElementById('tempo-restante');
const barraTempo = document.getElementById('progresso-tempo');
const caixaCronometro = document.getElementById('cronometro-box');

// --- SISTEMA DE CRONÔMETRO ---
function iniciarCronometro() {
    tempoRestante = TEMPO_LIMITE;
    elementoTempo.innerText = tempoRestante;
    barraTempo.style.width = "100%";
    barraTempo.style.backgroundColor = "var(--verde-principal)";
    
    // Zera intervalos órfãos se existirem
    clearInterval(cronometroIntervalo);

    cronometroIntervalo = setInterval(() => {
        tempoRestante--;
        elementoTempo.innerText = tempoRestante;
        
        // Atualiza a barra de progresso visual
        let porcentagem = (tempoRestante / TEMPO_LIMITE) * 100;
        barraTempo.style.width = `${porcentagem}%`;

        if (tempoRestante <= 5) {
            barraTempo.style.backgroundColor = "var(--vermelho-alerta)";
        }

        if (tempoRestante <= 0) {
            clearInterval(cronometroIntervalo);
            tempoEsgotado();
        }
    }, 1000);
}

function tempoEsgotado() {
    const respostaCorreta = dadosQuiz[indicePerguntaAtual].correta;
    const todosBotoes = containerOpcoes.querySelectorAll('.opcao-btn');

    todosBotoes.forEach(btn => btn.disabled = true);
    todosBotoes[respostaCorreta].classList.add('correta');
    
    elementoFeedback.innerHTML = `<span style="color: var(--vermelho-alerta);">⏰ O tempo acabou! A resposta correta foi destacada em verde.</span>`;
    btnProximo.classList.remove('escondido');
}

// --- LOGICA DE NAVEGAÇÃO DO QUIZ ---
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    caixaCronometro.style.display = "block";
    btnProximo.innerText = "Próxima";
    mostrarPergunta();
}

function mostrarPergunta() {
    resetarEstado();
    let perguntaAtual = dadosQuiz[indicePerguntaAtual];
    elementoPergunta.innerText = perguntaAtual.pergunta;
    elementoPasso.innerText = `Pergunta ${indicePerguntaAtual + 1} de ${dadosQuiz.length}`;

    perguntaAtual.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement('button');
        botao.innerText = opcao;
        botao.classList.add('opcao-btn');
        botao.addEventListener('click', () => selecionarOpcao(botao, indice));
        containerOpcoes.appendChild(botao);
    });

    iniciarCronometro();
}

function resetarEstado() {
    elementoFeedback.innerText = "";
    btnProximo.classList.add('escondido');
    while (containerOpcoes.firstChild) {
        containerOpcoes.removeChild(containerOpcoes.firstChild);
    }
}

function selecionarOpcao(botaoSelecionado, indiceSelecionado) {
    clearInterval(cronometroIntervalo); // Interrompe o relógio
    
    const respostaCorreta = dadosQuiz[indicePerguntaAtual].correta;
    const todosBotoes = containerOpcoes.querySelectorAll('.opcao-btn');

    todosBotoes.forEach(btn => btn.disabled = true); 

    if (indiceSelecionado === respostaCorreta) {
        botaoSelecionado.classList.add('correta');
        elementoFeedback.innerHTML = `<span style="color: #28a745;">🎉 ${dadosQuiz[indicePerguntaAtual].feedback}</span>`;
        pontuacao++;
    } else {
        botaoSelecionado.classList.add('errada');
        todosBotoes[respostaCorreta].classList.add('correta'); 
        elementoFeedback.innerHTML = `<span style="color: #dc3545;">❌ Ah, quase lá! Veja a explicação correta acima.</span>`;
    }

    btnProximo.classList.remove('escondido');
}

function avancarQuiz() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < dadosQuiz.length) {
        mostrarPergunta();
    } else {
        mostrarResultadoFinal();
    }
}

function mostrarResultadoFinal() {
    resetarEstado();
    clearInterval(cronometroIntervalo);
    
    caixaCronometro.style.display = "none";
    barraTempo.style.width = "0%";
    
    elementoPergunta.innerText = "Desafio Concluído!";
    elementoPasso.innerText = "";
    
    let mensagemDesempenho = "";
    if (pontuacao === dadosQuiz.length) {
        mensagemDesempenho = "Incrível! Você é um verdadeiro embaixador do agro sustentável! 🌟";
    } else if (pontuacao >= 3) {
        mensagemDesempenho = "Muito bom! Você conhece bem o nosso campo. 🌱";
    } else {
        mensagemDesempenho = "Bom esforço! Que tal ler o texto 'O Tema' novamente para gabaritar na próxima? 📚";
    }

    elementoFeedback.innerHTML = `Você acertou <strong>${pontuacao}</strong> de <strong>${dadosQuiz.length}</strong> perguntas!<br><br>${mensagemDesempenho}`;
    
    btnProximo.innerText = "Refazer Desafio";
    btnProximo.classList.remove('escondido');
}

// --- EVENTOS ---
btnProximo.addEventListener('click', () => {
    if (indicePerguntaAtual < dadosQuiz.length) {
        avancarQuiz();
    } else {
        iniciarQuiz();
    }
});

// Inicialização
iniciarQuiz();

