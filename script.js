const dadosQuiz = [
    {
        pergunta: "Qual prática ajuda a evitar a erosão e mantém os nutrientes do solo?",
        opcoes: ["Queimada controlada", "Plantio Direto e Rotação de Culturas", "Uso excessivo de fertilizantes", "Desmatamento parcial"],
        correta: 1
    },
    {
        pergunta: "Para que servem os drones na agricultura sustentável?",
        opcoes: ["Apenas para tirar fotos bonitas", "Para espantar pássaros e roedores", "Para monitorar lavouras com precisão e economizar insumos", "Para transportar colheitas pesadas"],
        correta: 2
    },
    {
        pergunta: "O equilíbrio entre produzir alimentos e cuidar do ecossistema chama-se:",
        opcoes: ["Desenvolvimento Desenfreado", "Expansão Irrestrita", "Sustentabilidade", "Urbanização Agrícola"],
        correta: 2
    },
    {
        pergunta: "Qual sistema integra árvores, pastagens e produção agrícola em um mesmo espaço?",
        opcoes: ["ILPF (Integração Lavoura-Pecuária-Floresta)", "Monocultura extensiva", "Pecuária Tradicional", "Silvicultura isolada"],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
const quizConteudo = document.getElementById('quiz-conteudo');

function carregarQuiz() {
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
            botaoOpcao.innerText = opacity = opcao;
            botaoOpcao.addEventListener('click', () => verificarResposta(botaoOpcao, index, item.correta));
            elementoOpcoes.appendChild(botaoOpcao);
        });

        quizConteudo.appendChild(elementoOpcoes);
    } else {
        // Tela de Resultados Finais
        quizConteudo.innerHTML = `
            <div class='quiz-pergunta' style='text-align:center;'>
                <i class="fa-solid fa-trophy" style="font-size:4rem; color:var(--amarelo); margin-bottom:15px;"></i>
                <br>Parabéns! Desafio Concluído!
            </div>
            <p style='text-align:center; font-size:1.2rem; margin-bottom:25px;'>
                Você acertou <strong>${pontuacao} de ${dadosQuiz.length}</strong> perguntas sobre o Agro Sustentável.
            </p>
            <div style="text-align:center;">
                <a href="index.html" class="btn">Voltar ao Início</a>
            </div>
        `;
    }
}

function verificarResposta(elemento, indiceSelecionado, indiceCorreto) {
    const todasOpcoes = document.querySelectorAll('.quiz-opcao');
    
    // Trava cliques extras enquanto processa a transição
    todasOpcoes.forEach(op => op.style.pointerEvents = 'none');

    if (indiceSelecionado === indiceCorreto) {
        // Se acertou: fica verde e passa de fase automaticamente após 800ms
        elemento.classList.add('opcao-correta');
        pontuacao++;
        setTimeout(() => {
            perguntaAtual++;
            carregarQuiz();
        }, 800);
    } else {
        // Se errou: apenas a opção clicada fica vermelha e a certa é revelada
        elemento.classList.add('opcao-errada');
        todasOpcoes[indiceCorreto].classList.add('opcao-correta');
        
        // Cria botão para o aluno poder avançar manualmente após ver o erro
        const btnAvancar = document.createElement('button');
        btnAvancar.className = 'btn';
        btnAvancar.style.marginTop = '25px';
        btnAvancar.style.width = '100%';
        btnAvancar.innerText = 'Continuar';
        btnAvancar.addEventListener('click', () => {
            perguntaAtual++;
            carregarQuiz();
        });
        quizConteudo.appendChild(btnAvancar);
    }
}

// Inicialização
carregarQuiz();
