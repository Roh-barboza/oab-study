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
// PDFs SYSTEM
// ============================================
let pdfViewer = null;
let currentPdfFilter = 'todos';

function renderPDFs(materia = 'todos') {
  const pdfGrid = document.getElementById('pdfGrid');
  if (!pdfGrid) return;

  let pdfs = PDF_STORAGE.getAll();
  if (materia !== 'todos') {
    pdfs = pdfs.filter(p => p.materia === materia);
  }

  if (!pdfs || pdfs.length === 0) {
    pdfGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--muted);"><p>Nenhum PDF encontrado</p><p style="margin-top: 1rem; font-size: 0.9rem;">Adicione um PDF usando o botão de upload acima.</p></div>';
    return;
  }

  pdfGrid.innerHTML = pdfs.map(pdf => `
    <div class="pdf-card" data-id="${pdf.id}">
      <div class="pdf-header">
        <div class="pdf-icon">📄</div>
        <button class="pdf-remove" data-id="${pdf.id}" aria-label="Remover">✕</button>
      </div>
      <div class="pdf-content">
        <h4>${pdf.titulo}</h4>
        <p>${pdf.descricao}</p>
        <div class="pdf-meta">
          <small>${pdf.data}</small>
        </div>
        ${pdf.tags && pdf.tags.length > 0 ? `<div class="pdf-tags">${pdf.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
        <button class="pdf-open" data-id="${pdf.id}">Abrir →</button>
      </div>
    </div>
  `).join('');

  // Adiciona listeners
  document.querySelectorAll('.pdf-open').forEach(btn => {
    btn.addEventListener('click', () => openPDFViewer(btn.dataset.id));
  });

  document.querySelectorAll('.pdf-remove').forEach(btn => {
    btn.addEventListener('click', () => removePDF(btn.dataset.id));
  });
}

function openPDFViewer(pdfId) {
  const pdf = PDF_STORAGE.getById(pdfId);
  if (!pdf) return;

  const modal = document.createElement('div');
  modal.className = 'pdf-modal';
  modal.innerHTML = `
    <div class="pdf-viewer">
      <div class="pdf-toolbar">
        <div class="pdf-title">
          <h3>${pdf.titulo}</h3>
          <p>${pdf.descricao}</p>
        </div>
        <button class="pdf-close" aria-label="Fechar">✕</button>
      </div>
      <div class="pdf-frame">
        ${pdf.url ? `<embed src="${pdf.url}" type="application/pdf" width="100%" height="100%">` :
          '<p style="padding: 2rem; text-align: center; color: var(--muted);">PDF não carregado. Faça upload do arquivo.</p>'}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('.pdf-close').addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function removePDF(pdfId) {
  if (confirm('Deseja remover este PDF?')) {
    PDF_STORAGE.removePDF(pdfId);
    renderPDFs(currentPdfFilter);
  }
}

// Filtros de PDF
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentPdfFilter = chip.dataset.filter;
    renderPDFs(currentPdfFilter);
  });
});

// Upload de PDF
const uploadPdfBtn = document.getElementById('uploadPdfBtn');
if (uploadPdfBtn) {
  uploadPdfBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Aqui você pode processar o PDF ou armazenar a URL
          alert('PDF importado com sucesso! (Funcionalidade de upload está pronta para integração com backend)');
          // PDF_STORAGE.addPDF({ titulo: file.name, materia: 'etica', descricao: 'Importado', tags: [], url: event.target.result });
          // renderPDFs(currentPdfFilter);
        };
        reader.readAsDataURL(file);
      }
    });
    input.click();
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
  initPDFSystem();
  renderPDFs();
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
