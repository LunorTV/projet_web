// Affiche le menu de bienvenue
function showWelcome() {
    document.getElementById('welcomeOverlay').style.display = 'flex';
    document.body.classList.add('menu-open');
}

// Ferme le menu de bienvenue
function closeWelcome() {
    document.getElementById('welcomeOverlay').style.display = 'none';
    document.body.classList.remove('menu-open');
}

// Affiche le CV (ferme juste le menu)
function showCV() {
    closeWelcome();
}

// Affiche le quiz
function showQuiz() {
    document.getElementById('quizModal').style.display = 'flex';
    
}

// Ferme le quiz
function closeQuiz() {
    document.getElementById('quizModal').style.display = 'none';
    retryQuiz();
}

// Réinitialise le quiz
function retryQuiz() {
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('quizButtons').style.display = 'block';
    document.querySelectorAll('#quizContainer input[type="radio"]').forEach(el => el.checked = false);
}

// Calculatrice (si tu l'utilises)
function showCalculator() {
    document.getElementById('calculatorModal').style.display = 'flex';
}
function closeCalculator() {
    document.getElementById('calculatorModal').style.display = 'none';
    clearDisplay();
}
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}
function clearDisplay() {
    document.getElementById('display').value = '';
}
function clearEntry() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}
function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value.replace(/[^-()\d/*+.]/g, ''));
    } catch {
        display.value = 'Erreur';
    }
}

// Fermer les modals avec Echap
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        closeQuiz();
        closeCalculator();
    }
});

// Afficher le menu de bienvenue au chargement
window.onload = function() {
    showWelcome();
};

let currentQuestion = 0;
let reponses = []; // Stocke les réponses sous forme A{qid}_{rid}

function showQuiz() {
    document.getElementById('quizModal').style.display = 'flex';
    currentQuestion = 0;
    reponses = [];
    showNextQuestion();
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('quizButtons').style.display = 'none';
}

function showNextQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    if (currentQuestion >= questionnaire.length) {
        showQuizResult();
        return;
    }
    const q = questionnaire[currentQuestion];
    quizContainer.innerHTML = `
        <div>
            <p>${q.question}</p>
            <div class="quiz-options">
                ${q.options.map((opt, idx) => `
                    <button class="quiz-option-btn" onclick="selectAnswer('${opt.replace(/'/g, "\\'")}', ${idx})">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectAnswer(answer, idx) {
    // Stocke la réponse sous forme A{qid}_{rid}
    reponses.push(`A${currentQuestion}_${idx}`);
    currentQuestion++;
    showNextQuestion();
}

function showQuizResult() {
    // Vérifie si toutes les réponses sont correctes
    document.getElementById('quizContainer').innerHTML = "";
    let allCorrect = true;
    for (let i = 0; i < questionnaire.length; i++) {
        const correctIdx = questionnaire[i].options.indexOf(questionnaire[i].correct);
        if (reponses[i] !== `A${i}_${correctIdx}`) {
            allCorrect = false;
            break;
        }
    }
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizButtons').style.display = 'flex';
    if (allCorrect) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
    } else {
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'block';
    }
}

// Pour fermer le quiz
function closeQuiz() {
    document.getElementById('quizModal').style.display = 'none';
}

function bruteForceContact() {
    // Génère la bonne combinaison pour ton quiz
    let bonnesReponses = questionnaire.map((q, i) => {
        const idx = q.options.indexOf(q.correct);
        return `A${i}_${idx}`;
    });
    // Exemple : redirige vers la page correspondante (à adapter selon ton projet)
    let page = bonnesReponses.join('_') + '.html';
    window.location.href = page;
}
function bruteForceContact() {
    // Trouve l'index des bonnes réponses pour chaque question
    let bonnesReponses = questionnaire.map((q, i) => {
        const idx = q.options.indexOf(q.correct);
        return `A${i}_${idx}`;
    });
    // Construit le nom de la page cible
    let page = bonnesReponses.join('_') + '.html';
    window.location.href = page;
}