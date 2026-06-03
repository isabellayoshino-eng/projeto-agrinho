// --- MENU RESPONSIVO MOBILE ---
const botaoMenu = document.getElementById('btn-menu-toggle');
const linksMenu = document.getElementById('menu-principal');

botaoMenu.addEventListener('click', () => {
    linksMenu.classList.toggle('active-menu');
});

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        linksMenu.classList.remove('active-menu');
    });
});

// --- BASE DE DADOS AMPLIADA E PEDAGÓGICA ---
const bancoQuestoes = [
    {
        pergunta: "A tecnologia ILPF (Integração Lavoura-Pecuária-Floresta) promove qual benefício direto ao ecossistema?",
        alternativas: [
            "A) O esgotamento planejado dos recursos minerais da fazenda.",
            "B) Neutralização de gases do efeito estufa pelo crescimento de árvores e recuperação do solo.",
            "C) Concentração da produção em um único mês do ano."
        ],
        gabarito: 1,
        explicacao: "Excelente! A ILPF otimiza a ciclagem de nutrientes e retém carbono na biomassa florestal e no solo."
    },
    {
        pergunta: "Na agricultura de precisão, como a Internet das Coisas (IoT) atua diretamente na sustentabilidade?",
        alternativas: [
            "A) Automatizando a compra de combustíveis fósseis sem controle do proprietário.",
            "B) Ignorando as variações do clima e mantendo o maquinário ligado.",
            "C) Monitorando os índices do solo em tempo real, evitando o desperdício de água e fertilizantes."
        ],
        gabarito: 2,
        explicacao: "Exato! Sensores inteligentes informam a dose exata que a planta necessita, eliminando excessos nocivos."
    },
    {
        pergunta: "Por que o Sistema de Plantio Direto é considerado fundamental para a segurança do solo brasileiro?",
        alternativas: [
            "A) Pois mantém a palhada protetora sobre a terra, reduzindo drasticamente a erosão hídrica e eólica.",
            "B) Pois exige que o solo seja revirado profundamente todas as semanas.",
            "C) Porque elimina a necessidade do uso de sementes selecionadas."
        ],
        gabarito: 0,
        explicacao: "Correto! Sem perturbar a terra e mantendo a cobertura vegetal, o solo guarda umidade e evita assorear rios."
    },
    {
        pergunta: "De qual forma o Agronegócio moderno contribui de maneira sustentável com a matriz energética do Brasil?",
        alternativas: [
            "A) Utilizando exclusivamente geradores a carvão vegetal.",
            "B) Gerando energia limpa por meio da biomassa de cana, painéis solares e reaproveitamento de dejetos para biogás.",
            "C) Aumentando a importação de derivados de petróleo pesado."
        ],
        gabarito: 1,
        explicacao: "Perfeito! O aproveitamento de subprodutos e resíduos transforma passivos ambientais em fontes elétricas limpas."
    },
    {
        pergunta: "Qual é o principal ganho social proporcionado pelo incentivo à Sucessão Familiar no campo?",
        alternativas: [
            "A) Garantir que as novas gerações levem formação tecnológica avançada de volta à gestão das propriedades rurais.",
            "B) Forçar o êxodo rural imediato de todos os jovens da comunidade.",
            "C) Acabar com as técnicas tradicionais de cultivo familiar."
        ],
        gabarito: 0,
        explicacao: "Sensacional! O jovem capacitado promove a transformação tecnológica da fazenda de seus pais, perpetuando o agro forte."
    }
];

// --- MECÂNICA DO QUIZ ---
let faseAtual = 0;
let acertosTotais = 0;
let contadorRegressivo = 15;
let temporizadorID;
const MAX_TEMPO = 15;

const txtPergunta = document.getElementById('texto-da-pergunta');
const containerOpcoes = document.getElementById('lista-opcoes');
const painelFeedback = document.getElementById('caixa-feedback-aula');
const txtPasso = document.getElementById('label-passo');
const btnAcaoQuiz = document.getElementById('btn-proxima-fase');
const txtSegundos = document.getElementById('segundos-regressivos');
const preenchimentoBarra = document.getElementById('gauge-fill');
const painelCronometro = document.getElementById('area-cronometro');

function iniciarDesafio() {
    faseAtual = 0;
    acertosTotais = 0;
    painelCronometro.style.display = "block";
    btnAcaoQuiz.innerText = "Aguardando Resposta";
    carregarFase();
}

function carregarFase() {
    limparEstadoFase();
    let dadosFase = bancoQuestoes[faseAtual];
    txtPergunta.innerText = dadosFase.pergunta;
    txtPasso.innerText = `Etapa ${faseAtual + 1} de ${bancoQuestoes.length}`;

    dadosFase.alternativas.forEach((textoOpcao, indice) => {
        const botaoOpcao = document.createElement('button');
        botaoOpcao.innerText = textoOpcao;
        botaoOpcao.classList.add('opcao-quiz-btn');
        botaoOpcao.addEventListener('click', () => avaliarEscolha(botaoOpcao, indice));
        containerOpcoes.appendChild(botaoOpcao);
    });

    dispararRelogio();
}

function limparEstadoFase() {
    painelFeedback.innerText = "";
    painelFeedback.style.display = "none";
    btnAcaoQuiz.classList.add('disabled-btn');
    btnAcaoQuiz.disabled = true;
    btnAcaoQuiz.innerText = "Aguardando Resposta";
    while (containerOpcoes.firstChild) {
        containerOpcoes.removeChild(containerOpcoes.firstChild);
    }
}

function dispararRelogio() {
    contadorRegressive = MAX_TEMPO;
    txtSegundos.innerText = contadorRegressive;
    preenchimentoBarra.style.width = "100%";
    preenchimentoBarra.style.backgroundColor = "var(--ouro-solar)";
    
    clearInterval(temporizadorID);

    temporizadorID = setInterval(() => {
        contadorRegressive--;
        
