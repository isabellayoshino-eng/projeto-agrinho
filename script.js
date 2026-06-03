// 1. Menu Mobile (Hambúrguer)
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em qualquer item (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Sistema de Quiz Interativo
const dadosQuiz = [
    {
        pergunta: "Qual prática ajuda a evitar a erosão e mantém os nutrientes do solo?",
        opcoes: ["Queimada controlada", "Plantio Direto e Rotação de Culturas", "Uso excessivo de fertilizantes", "Desmatamento parcial"],
        correta: 1
    },
    {
        pergunta: "Para que servem os drones na agricultura sustentável?",
        opcoes: ["Apenas para tirar fotos bonitas", "Para espantar pássaros", "Para monitorar lavouras de forma precisa economizando recursos", "Para transportar colheitas pesadas"],
        correta: 2
    },
    {
        pergunta: "O equilíbrio entre produzir alimentos e cuidar do ecossistema chama-se:",
        opcoes: ["Desenvolvimento Desenfreado", "Sustentabilidade", "Monocultura Comercial", "Urbanização Agrícola"],
        correta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

const quizConteudo = document.getElementById('quiz-conteudo');
const btnProximo = document.getElementById('btn-proximo');

function carregarQuiz() {
    btnProximo.style.display = "none";
    quizConteudo.innerHTML = "";

    if (perguntaAtual < dadosQuiz.length) {
        const item = dadosQuiz[perguntaAtual];
        
        const elementoPergunta = document.createElement('div');
        elementoPergunta.className = 'quiz-pergunta';
        elementoPergunta.innerText = `${perguntaAtual + 1}. ${item.pergunta}`;
        quizConteudo.appendChild(elementoPergunta);

        const elementoOpcoes = document.createElement('div');
        elementoOpcoes.className = 'quiz-opcoes';

        item.opcoes.forEach((opcao, index) => {
            const botaoOpcao = document.createElement('div');
            botaoOpcao.className = 'quiz-opcao';
            botaoOpcao.innerText = opcao;
            botaoOpcao.addEventListener('click', () => selecionarOpcao(botaoOpcao, index, item.correta));
            elementoOpcoes.appendChild(botaoOpcao);
        });

        quizConteudo.appendChild(elementoOpcoes);
    } else {
        // Fim do quiz
        quizConteudo.innerHTML = `
            <div class='quiz-pergunta' style='text-align:center;'>
                <i class="fa-solid fa-award" style="font-size:4rem; color:var(--amarelo); margin-bottom:15px;"></i>
                <br>Você concluiu o Quiz!
            </div>
            <p style='text-align:center; font-size:1.2rem;'>Sua pontuação: <strong>${pontuacao} de ${dadosQuiz.length}</strong> acertos.</p>
        `;
        btnProximo.style.display = "none";
    }
}

function selecionarOpcao(elemento, indiceSelecionado, indiceCorreto) {
    const todasOpcoes = document.querySelectorAll('.quiz-opcao');
    
    // Desabilita cliques adicionais
    todasOpcoes.forEach(op => {
        op.style.pointerEvents = 'none';
        if(op.innerText === dadosQuiz[perguntaAtual].opcoes[indiceCorreto]){
            op.classList.add('correta'); // Mostra a certa de qualquer forma
        }
    });

    if (indiceSelecionado === indiceCorreto) {
        elemento.classList.add('correta');
        pontuacao++;
    } else {
        elemento.classList.add('errada');
    }

    btnProximo.style.display = "block";
}

btnProximo.addEventListener('click', () => {
    perguntaAtual++;
    carregarQuiz();
});

// Inicia o quiz ao carregar a página
carregarQuiz();

// 3. Validação Básica de Formulário com Alerta
document.getElementById('meuFormulario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    alert(`Obrigado pelo contato, ${nome}! Sua mensagem sobre sustentabilidade no campo foi enviada com sucesso ao Agrinho 2026.`);
    this.reset();
});
