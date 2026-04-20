// ============================================
// SCRIPT.JS - Lógica do OAB Study
// ============================================

// Estado global do usuário
const state = {
  xp: 3420,
  xpToday: 240,
  level: 12,
  correct: 19,
  wrong: 6,
  reviewQueue: 7,
  answered: 25,
  cardsSeen: 41,
  focusMinutes: 440,
  achievements: 5,
  streak: 8,
  questionIndex: 0,
  timer: 1500,
  running: false,
  interval: null,
  currentMateria: 'etica'
};

// Elementos do DOM
const subjectGrid = document.getElementById('subjectGrid');
const flashcardGrid = document.getElementById('flashcardGrid');
const questionSubject = document.getElementById('questionSubject');
const questionText = document.getElementById('questionText');
const optionsBox = document.getElementById('options');
const feedbackBox = document.getElementById('feedbackBox');
const recommendation = document.getElementById('recommendation');

// ============================================
// RENDERIZAÇÃO DE MATÉRIAS
// ============================================
function renderSubjects() {
  subjectGrid.innerHTML = MATERIAS.map((materia) => `
    <article class="subject-card">
      <div class="subject-head">
        <h4>${materia.nome}</h4>
        <span class="pill">${materia.acuracia >= 75 ? 'forte' : materia.acuracia >= 65 ? 'subindo' : 'revisar'}</span>
      </div>
      <div class="subject-meta">
        <span>${materia.questoesFeitas} questões</span>
        <span>${materia.acuracia}% acerto</span>
      </div>
      <div class="progress">
        <span style="width:${materia.acuracia}%"></span>
      </div>
      <div class="subject-actions">
        <button class="chip" onclick="viewMateriaContent('${materia.id}')">Resumo</button>
        <button class="chip" onclick="filterQuestionsByMateria('${materia.id}')">Questões</button>
        <button class="chip" onclick="filterFlashcardsByMateria('${materia.id}')">Flashcards</button>
      </div>
    </article>
  `).join('');
}

// ============================================
// RENDERIZAÇÃO DE FLASHCARDS
// ============================================
function renderFlashcards() {
  flashcardGrid.innerHTML = FLASHCARDS.map((card, i) => `
    <article class="flashcard">
      <small>${card.materia.toUpperCase()}</small>
      <strong id="flash-title-${i}">${card.pergunta}</strong>
      <p id="flash-text-${i}">Toque em revelar para ver a resposta.</p>
      <button class="chip" onclick="toggleFlashcard(${i})">Revelar</button>
    </article>
  `).join('');
}

window.toggleFlashcard = function(i) {
  const title = document.getElementById(`flash-title-${i}`);
  const text = document.getElementById(`flash-text-${i}`);
  const card = FLASHCARDS[i];
  const showingBack = title.dataset.back === 'true';
  
  if (showingBack) {
    title.textContent = card.pergunta;
    text.textContent = 'Toque em revelar para ver a resposta.';
    title.dataset.back = 'false';
  } else {
    title.textContent = 'Resposta';
    text.textContent = card.resposta;
    title.dataset.back = 'true';
    state.cardsSeen += 1;
    updateStats();
  }
};

// ============================================
// RENDERIZAÇÃO DE QUESTÕES
// ============================================
function renderQuestion() {
  const q = QUESTOES[state.questionIndex];
  if (!q) {
    feedbackBox.textContent = 'Nenhuma questão disponível. Volte em breve!';
    return;
  }
  
  questionSubject.textContent = getMateriaName(q.materia);
  questionText.textContent = q.enunciado;
  feedbackBox.textContent = 'Escolha uma alternativa para receber feedback imediato.';
  
  optionsBox.innerHTML = q.alternativas.map((opt, idx) => `
    <button class="option" data-index="${idx}">${opt}</button>
  `).join('');
  
  optionsBox.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', () => answerQuestion(Number(btn.dataset.index)));
  });
}

function getMateriaName(materiaId) {
  const materia = MATERIAS.find(m => m.id === materiaId);
  return materia ? materia.nome : 'Matéria';
}

function answerQuestion(index) {
  const q = QUESTOES[state.questionIndex];
  const buttons = [...optionsBox.querySelectorAll('.option')];
  
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.gabarito) btn.classList.add('correct');
    if (idx === index && idx !== q.gabarito) btn.classList.add('wrong');
  });
  
  if (index === q.gabarito) {
    state.correct += 1;
    state.xp += 40;
    state.xpToday += 40;
    feedbackBox.textContent = `✅ Acertou! ${q.explicacao}`;
  } else {
    state.wrong += 1;
    state.reviewQueue += 1;
    state.xp += 10;
    state.xpToday += 10;
    feedbackBox.textContent = `❌ Errou. ${q.explicacao}`;
  }
  
  state.answered += 1;
  updateStats();
  updateRecommendation();
}

function nextQuestion() {
  state.questionIndex = (state.questionIndex + 1) % QUESTOES.length;
  renderQuestion();
  feedbackBox.textContent = 'Nova questão carregada.';
}

// ============================================
// FILTROS DE QUESTÕES E FLASHCARDS
// ============================================
window.filterQuestionsByMateria = function(materiaId) {
  state.currentMateria = materiaId;
  const questoesMateria = QUESTOES.filter(q => q.materia === materiaId);
  if (questoesMateria.length > 0) {
    state.questionIndex = QUESTOES.indexOf(questoesMateria[0]);
    renderQuestion();
    document.getElementById('questoes').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.filterFlashcardsByMateria = function(materiaId) {
  const flashcardsMateria = FLASHCARDS.filter(f => f.materia === materiaId);
  if (flashcardsMateria.length > 0) {
    flashcardGrid.innerHTML = flashcardsMateria.map((card, i) => `
      <article class="flashcard">
        <small>${card.materia.toUpperCase()}</small>
        <strong id="flash-title-${i}">${card.pergunta}</strong>
        <p id="flash-text-${i}">Toque em revelar para ver a resposta.</p>
        <button class="chip" onclick="toggleFlashcard(${i})">Revelar</button>
      </article>
    `).join('');
    document.getElementById('flashcards').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.viewMateriaContent = function(materiaId) {
  const materia = MATERIAS.find(m => m.id === materiaId);
  if (materia) {
    alert(`${materia.nome}\n\n${materia.resumo}`);
  }
};

// ============================================
// RECOMENDAÇÕES
// ============================================
function updateRecommendation() {
  const acc = Math.round((state.correct / Math.max(1, state.correct + state.wrong)) * 100);
  
  if (acc < 70) {
    recommendation.textContent = '📚 Seu próximo melhor passo é revisar erros recentes e depois refazer 5 questões.';
  } else if (state.reviewQueue >= 8) {
    recommendation.textContent = '⚠️ Há muitos pontos para revisão: ataque a fila de erros antes do simulado completo.';
  } else {
    recommendation.textContent = '🚀 Você está em bom ritmo: siga para mais um bloco de questões e finalize com flashcards.';
  }
}

// ============================================
// ATUALIZAÇÃO DE ESTATÍSTICAS
// ============================================
function formatMinutes(total) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`;
}

function updateStats() {
  const total = state.correct + state.wrong;
  const acc = Math.round((state.correct / Math.max(1, total)) * 100);
  
  document.getElementById('xpToday').textContent = state.xpToday;
  document.getElementById('streakValue').textContent = `${state.streak} dias`;
  document.getElementById('correctValue').textContent = state.correct;
  document.getElementById('wrongValue').textContent = state.wrong;
  document.getElementById('globalPercent').textContent = `${acc}%`;
  document.getElementById('globalBar').style.width = `${acc}%`;
  document.getElementById('totalAnswered').textContent = state.answered;
  document.getElementById('accuracyRate').textContent = `${acc}%`;
  document.getElementById('cardsSeen').textContent = state.cardsSeen;
  document.getElementById('focusTime').textContent = formatMinutes(state.focusMinutes);
  document.getElementById('xpTotal').textContent = state.xp;
  document.getElementById('levelValue').textContent = state.level;
  document.getElementById('reviewQueue').textContent = state.reviewQueue;
  document.getElementById('achievementCount').textContent = state.achievements;
}

// ============================================
// TIMER POMODORO
// ============================================
function renderTimer() {
  const min = Math.floor(state.timer / 60);
  const sec = state.timer % 60;
  document.getElementById('timerDisplay').textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function startTimer() {
  if (state.running) return;
  state.running = true;
  state.interval = setInterval(() => {
    if (state.timer > 0) {
      state.timer -= 1;
    } else {
      clearInterval(state.interval);
      state.running = false;
      state.focusMinutes += 25;
      renderTimer();
      updateStats();
      return;
    }
    renderTimer();
  }, 1000);
}

function pauseTimer() {
  state.running = false;
  clearInterval(state.interval);
}

function resetTimer() {
  pauseTimer();
  state.timer = 1500;
  renderTimer();
}

// ============================================
// EVENT LISTENERS
// ============================================
document.getElementById('nextQuestion').addEventListener('click', nextQuestion);

document.getElementById('markReviewed').addEventListener('click', () => {
  state.reviewQueue += 1;
  feedbackBox.textContent = '🔖 Questão enviada para revisão. Ótimo para atacar erros depois.';
  updateStats();
  updateRecommendation();
});

document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);

// Tema
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
themeToggle.addEventListener('click', () => {
  root.setAttribute('data-theme', root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Menu mobile
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
menuButton.addEventListener('click', () => sidebar.classList.toggle('open'));

// Navegação
document.querySelectorAll('[data-nav]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-nav]').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const target = document.getElementById(button.dataset.nav);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    sidebar.classList.remove('open');
  });
});

// Hero button
const heroStart = document.getElementById('heroStart');
if (heroStart) {
  heroStart.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('questoes').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
function init() {
  renderSubjects();
  renderFlashcards();
  renderQuestion();
  renderTimer();
  updateStats();
  updateRecommendation();
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
