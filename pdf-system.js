// ============================================
// PDF-SYSTEM.JS - Sistema de PDFs Integrado
// ============================================

const PDF_STORAGE = {
  // PDFs padrão do sistema (podem ser carregados via upload)
  pdfs: [
    {
      id: 'resumo-etica',
      titulo: 'Resumo - Ética Profissional',
      materia: 'etica',
      descricao: 'Guia completo sobre EOAB e prerrogativas',
      data: '2025-04-20',
      tags: ['ética', 'EOAB', 'resumo']
    },
    {
      id: 'resumo-tributario',
      titulo: 'Resumo - Direito Tributário',
      materia: 'tributario',
      descricao: 'Princípios tributários e imunidades',
      data: '2025-04-20',
      tags: ['tributário', 'impostos', 'resumo']
    },
    {
      id: 'resumo-constitucional',
      titulo: 'Resumo - Direito Constitucional',
      materia: 'constitucional',
      descricao: 'Remédios constitucionais e direitos fundamentais',
      data: '2025-04-20',
      tags: ['constitucional', 'CF', 'resumo']
    },
    {
      id: 'resumo-penal',
      titulo: 'Resumo - Direito Penal',
      materia: 'penal',
      descricao: 'Crimes, penas e excludentes',
      data: '2025-04-20',
      tags: ['penal', 'crimes', 'resumo']
    },
    {
      id: 'resumo-processopereal',
      titulo: 'Resumo - Processo Penal',
      materia: 'processpenal',
      descricao: 'Inquérito, ação penal e prisão',
      data: '2025-04-20',
      tags: ['processo penal', 'CPP', 'resumo']
    },
    {
      id: 'resumo-civil',
      titulo: 'Resumo - Direito Civil',
      materia: 'civil',
      descricao: 'Pessoas, prescrição e família',
      data: '2025-04-20',
      tags: ['civil', 'CC', 'resumo']
    },
    {
      id: 'resumo-trabalho',
      titulo: 'Resumo - Direito do Trabalho',
      materia: 'trabalho',
      descricao: 'Jornada, FGTS e direitos trabalhistas',
      data: '2025-04-20',
      tags: ['trabalho', 'CLT', 'resumo']
    },
    {
      id: 'resumo-administrativo',
      titulo: 'Resumo - Direito Administrativo',
      materia: 'administrativo',
      descricao: 'Princípios e atos administrativos',
      data: '2025-04-20',
      tags: ['administrativo', 'LIMPE', 'resumo']
    }
  ],

  // Carrega PDFs do localStorage
  load() {
    const stored = localStorage.getItem('oab_pdfs');
    if (stored) {
      try {
        this.pdfs = JSON.parse(stored);
      } catch (e) {
        console.error('Erro ao carregar PDFs:', e);
      }
    }
  },

  // Salva PDFs no localStorage
  save() {
    localStorage.setItem('oab_pdfs', JSON.stringify(this.pdfs));
  },

  // Adiciona novo PDF
  addPDF(pdf) {
    const newPdf = {
      id: 'pdf-' + Date.now(),
      titulo: pdf.titulo,
      materia: pdf.materia,
      descricao: pdf.descricao,
      data: new Date().toISOString().split('T')[0],
      tags: pdf.tags || [],
      url: pdf.url // URL do PDF ou data URL
    };
    this.pdfs.push(newPdf);
    this.save();
    return newPdf;
  },

  // Remove PDF
  removePDF(id) {
    this.pdfs = this.pdfs.filter(p => p.id !== id);
    this.save();
  },

  // Busca PDFs por matéria
  getByMateria(materia) {
    return this.pdfs.filter(p => p.materia === materia);
  },

  // Busca todos os PDFs
  getAll() {
    return this.pdfs;
  },

  // Busca PDF por ID
  getById(id) {
    return this.pdfs.find(p => p.id === id);
  },

  // Busca por tags
  searchByTag(tag) {
    return this.pdfs.filter(p =>
      p.tags.includes(tag.toLowerCase())
    );
  }
};

// UI para exibir PDFs
class PDFViewer {
  constructor() {
    this.currentPdf = null;
  }

  // Cria card do PDF
  createCard(pdf) {
    return `
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
          <div class="pdf-tags">
            ${pdf.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <button class="pdf-open" data-id="${pdf.id}">Abrir →</button>
        </div>
      </div>
    `;
  }

  // Renderiza lista de PDFs
  renderList(container, pdfs) {
    if (!pdfs || pdfs.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted);">Nenhum PDF disponível</p>';
      return;
    }
    container.innerHTML = pdfs.map(pdf => this.createCard(pdf)).join('');
  }

  // Abre PDF em modal/viewer
  openPDF(pdfId) {
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
          ${pdf.url ? `<iframe src="${pdf.url}" frameborder="0"></iframe>` :
            '<p style="padding: 2rem; text-align: center; color: var(--muted);">PDF não disponível. Faça upload do arquivo.</p>'}
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
}

// Inicializa sistema
function initPDFSystem() {
  PDF_STORAGE.load();
  console.log('PDF System inicializado com', PDF_STORAGE.pdfs.length, 'arquivos');
}

// Exportar para uso
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PDF_STORAGE, PDFViewer };
}
