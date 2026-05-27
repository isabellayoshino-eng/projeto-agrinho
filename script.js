document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".question-block");
    const resultBox = document.getElementById("quiz-result");
    const resultText = document.getElementById("result-text");
    const restartBtn = document.getElementById("btn-restart");
    
    let score = 0;
    let answeredQuestions = 0;
    const totalQuestions = questions.length;

    questions.forEach((questionBlock) => {
        const buttons = questionBlock.querySelectorAll(".btn-opt");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                // Impede que o usuário mude a resposta após clicar
                if (questionBlock.classList.contains("answered")) return;

                questionBlock.classList.add("answered");
                answeredQuestions++;

                const isCorrect = button.getAttribute("data-correct") === "true";

                if (isCorrect) {
                    score++;
                    button.style.backgroundColor = "#2a9d8f"; // Verde sucesso
                    button.innerHTML += "  (Correto!)";
                } else {
                    button.style.backgroundColor = "#e76f51"; // Vermelho erro
                    button.innerHTML += "  (Incorreto)";
                    
                    // Mostra visualmente qual era a alternativa certa
                    buttons.forEach((btn) => {
                        if (btn.getAttribute("data-correct") === "true") {
                            btn.style.border = "3px solid #2a9d8f";
                        }
                    });
                }

                // Desativa os outros botões do bloco
                buttons.forEach(btn => btn.style.cursor = "default");

                // Verifica se o quiz terminou
                if (answeredQuestions === totalQuestions) {
                    showFinalResult();
                }
            });
        });
    });

    function showFinalResult() {
        resultBox.style.display = "block";
        if (score === totalQuestions) {
            resultText.innerHTML = ` Excelente! Você acertou ${score} de ${totalQuestions}. Suas escolhas protegem o futuro do nosso planeta!`;
        } else if (score > 0) {
            resultText.innerHTML = `Bom trabalho! Você acertou ${score} de ${totalQuestions}. Algumas práticas ainda podem melhorar para alcançar o equilíbrio ideal.`;
        } else {
            resultText.innerHTML = `Você acertou ${score} de ${totalQuestions}. Que tal revisar os conceitos do Agrinho e tentar de novo?`;
        }
        resultBox.scrollIntoView({ behavior: 'smooth' });
    }

    // Função para reiniciar o quiz
    restartBtn.addEventListener("click", () => {
        score = 0;
        answeredQuestions = 0;
        resultBox.style.display = "none";

        questions.forEach((questionBlock) => {
            questionBlock.classList.remove("answered");
            const buttons = questionBlock.querySelectorAll(".btn-opt");
            
            // Restaura os textos originais e os tons de verde iniciais
            buttons.forEach((btn) => {
                btn.style.backgroundColor = ""; 
                btn.style.border = "none";
                btn.style.cursor = "pointer";
                btn.innerHTML = btn.innerHTML.replace("  (Correto!)", "").replace("  (Incorreto)", "");
            });
        });
        
        document.getElementById("quiz-section").scrollIntoView({ behavior: 'smooth' });
    });
});
