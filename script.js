// --- MENU MOBILE ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('ativo');
});

// Fechar menu ao clicar em algum link no mobile para melhorar usabilidade
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('ativo');
    });
});

// --- BANCO DE DADOS DO QUIZ ---
const dadosQuiz = [
    {
        pergunta: "Qual das alternativas abaixo é um exemplo de tecnologia aplicada ao agro sustentável?",
        opcoes: [
            "A) Irrigação contínua sem controle técnico.",
            "B) Monitoramento por drones para aplicar água e insumos no local exato.",
            "C) Eliminação completa de toda a vegetação ao redor da plantação."
        ],
        correta: 1,
        feedback: "Correto! O uso de drones ajuda no mapeamento detalhado da plantação, evitando desperdícios."
    },
    {
        pergunta: "Como o sistema de Plantio Direto ajuda na conservação ambiental?",
        opcoes: [
            "A) Revirando a terra profundamente todas as semanas.",
            "B) Queimando os restos da colheita anterior para limpar o solo.",
            "C) Mantendo a palhada sobre o solo para protegê-lo da erosão."
        ],
        correta: 2,
        feedback: "Muito bem! A palhada protege a terra contra o vento e a chuva, mantendo a umidade."
    },
    {
        pergunta: "O que significa o termo 'Sucessão Familiar' no contexto do agronegócio?",
        opcoes: [
            "A) A continuidade do trabalho na propriedade rural pelas novas gerações da família.",
            "B) A venda obrigatória da fazenda quando os donos ficam idosos.",
            "C) O abandono total das terras para morar nas grandes cidades."
        ],
        correta: 0,
        feedback: "Isso mesmo! A sucessão familiar mantém vivas as tradições no campo agregando novas tecnologias pelas mãos dos jovens."
    }
];

// --- VARIÁVEIS DE ESTADO ---
let indicePerguntaAtual = 0;
let pontuacao = 0;

// --- ELEMENTOS DO DOM ---
const elementoPergunta = document.getElementById('pergunta-texto');
const containerOpcoes = document.getElementById('opcoes-container');
const elementoFeedback = document.getElementById('feedback-texto');
const elementoPasso = document.getElementById('placar-passo');
const btnProximo = document.getElementById('btn-proximo');

// --- FUNÇÕES ---
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
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
        botao.innerText = opacity = opcao;
        botao.classList.add('opcao-btn');
        botao.addEventListener('click', () => selecionarOpcao(botao, indice));
        containerOpcoes.appendChild(botao);
    });
}

function resetarEstado() {
    elementoFeedback.innerText = "";
    btnProximo.classList.add('escondido');
    while (containerOpcoes.firstChild) {
        containerOpcoes.removeChild(containerOpcoes.firstChild);
    }
}

function selecionarOpcao(botaoSelecionado, indiceSelecionado) {
    const respostaCorreta = dadosQuiz[indicePerguntaAtual].correta;
    const todosBotoes = containerOpcoes.querySelectorAll('.opcao-btn');

    // Desativa botões para impedir cliques múltiplos
    todosBotoes.forEach(btn => btn.disabled = true); 

    if (indiceSelecionado === respostaCorreta) {
        botaoSelecionado.classList.add('correta');
        elementoFeedback.innerHTML = `<span style="color: #28a745;">🎉 ${dadosQuiz[indicePerguntaAtual].feedback}</span>`;
        pontuacao++;
    } else {
        botaoSelecionado.classList.add('errada');
        todosBotoes[respostaCorreta].classList.add('correta'); // Exibe gabarito
        elementoFeedback.innerHTML = `<span style="color: #dc3545;">❌ Ah, quase lá! A resposta correta foi destacada em verde.</span>`;
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
    elementoPergunta.innerText = "Desafio Concluído!";
    elementoPasso.innerText = "";
    elementoFeedback.innerHTML = `Você acertou <strong>${pontuacao}</strong> de <strong>${dadosQuiz.length}</strong> perguntas!<br><br> Continue estudando e protegendo nosso agro!`;
    
    btnProximo.innerText = "Refazer Desafio";
    btnProximo.classList.remove('escondido');
}

// --- CONFIGURAÇÃO DE EVENTOS ---
btnProximo.addEventListener('click', () => {
    if (indicePerguntaAtual < dadosQuiz.length) {
        avancarQuiz();
    } else {
        iniciarQuiz();
    }
});

// Executa automaticamente ao carregar a página
iniciarQuiz();

