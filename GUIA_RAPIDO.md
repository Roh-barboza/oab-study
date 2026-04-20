# ⚡ GUIA RÁPIDO - OAB Study (Executável)

## 🎯 O que você tem AGORA

Três arquivos prontos para executar:

1. **PERPLEXITY_PROMPT_QUESTOES.md** → Prompt para Perplexity gerar as 64 questões
2. **questoes-template.json** → Template com as 64 questões JÁ PREENCHIDAS
3. **merge-questoes.js** → Script que integra as questões no database.js

---

## 🚀 OPÇÃO 1: USAR O TEMPLATE (MAIS RÁPIDO)

### Passo 1: Integrar as questões
```bash
node merge-questoes.js questoes-template.json
```

**O que faz:**
- ✅ Valida as 64 questões
- ✅ Cria backup de database.js
- ✅ Integra no database.js (total: 96 questões)
- ✅ Mostra resumo

**Resultado esperado:**
```
✅ Total de questões: 64/64
✅ IDs: 33-96
✅ Matérias: 8/8
✅ Arquivo: database.js
✅ Sucesso! Pronto para usar.
```

### Passo 2: Validar no navegador
```bash
# Abra index.html no navegador
# Console (F12) → copie e execute:
console.log(QUESTOES.length) // deve retornar 96
```

### Passo 3: Commit e Push
```bash
git add database.js
git commit -m "feat: Expand questions from 32 to 96 (8+ per subject)"
git push -u origin claude/oab-study-platform-CYZYK
```

**TEMPO TOTAL: ~5 minutos ⏱️**

---

## 🚀 OPÇÃO 2: USAR PERPLEXITY (SE QUISER CUSTOMIZAR)

### Passo 1: Copiar o prompt
- Abra: `PERPLEXITY_PROMPT_QUESTOES.md`
- Copie TODO o conteúdo entre os **```** (o prompt)

### Passo 2: Enviar para Perplexity
- Abra: https://www.perplexity.ai/
- Cole o prompt
- Aguarde ~2-3 minutos

### Passo 3: Salvar o resultado
- Copie o JSON que Perplexity gerou
- Salve em novo arquivo: `questoes-geradas.json`

**Exemplo:**
```json
[
  {
    "id": 33,
    "materia": "constitucional",
    "enunciado": "...",
    ...
  },
  ...
]
```

### Passo 4: Integrar
```bash
node merge-questoes.js questoes-geradas.json
```

### Passo 5: Validar e commit
```bash
# F12 no navegador → console.log(QUESTOES.length)
git add database.js
git commit -m "feat: Add 64 questions generated via Perplexity AI"
git push -u origin claude/oab-study-platform-CYZYK
```

**TEMPO TOTAL: ~10-15 minutos ⏱️**

---

## 📋 CHECKLIST

- [ ] Arquivo `PERPLEXITY_PROMPT_QUESTOES.md` existe
- [ ] Arquivo `questoes-template.json` existe
- [ ] Arquivo `merge-questoes.js` existe (executável)
- [ ] Node.js instalado (`node --version`)
- [ ] Rodou `node merge-questoes.js questoes-template.json`
- [ ] database.js foi atualizado
- [ ] Validou no navegador: `QUESTOES.length === 96`
- [ ] Commit feito: `git log --oneline`
- [ ] Push feito: verificar branch `claude/oab-study-platform-CYZYK`

---

## ✅ VALIDAÇÃO FINAL

### Console do Navegador (F12)

```javascript
// Copie e execute cada linha:

// 1. Total de questões
console.log(`Total: ${QUESTOES.length}`) // deve ser 96

// 2. Distribuição por matéria
const dist = {};
QUESTOES.forEach(q => {
  dist[q.materia] = (dist[q.materia] || 0) + 1;
});
console.table(dist); // deve mostrar 8 matérias com 8 questões cada

// 3. Validar IDs únicos
const ids = new Set(QUESTOES.map(q => q.id));
console.log(`IDs únicos: ${ids.size}`) // deve ser 96

// 4. Testar uma questão
const q1 = QUESTOES[0];
console.log(`
ID: ${q1.id}
Matéria: ${q1.materia}
Enunciado: ${q1.enunciado.substring(0, 50)}...
Alternativas: ${q1.alternativas.length}
Gabarito: ${q1.gabarito}
`);
```

---

## 🐛 TROUBLESHOOTING

### Erro: "arquivo não encontrado"
```bash
# Verifique se está no diretório certo
pwd
ls -la questoes-template.json
```

### Erro: "JSON inválido"
```bash
# Valide o JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('questoes-template.json')))"
```

### Erro: "database.js não encontrado"
```bash
# Verifique a estrutura
ls -la database.js
```

### QUESTOES.length retorna 32
- O script não foi executado ou falhou
- Verifique o backup criado: `ls -la database.js.backup-*`
- Restaure: `cp database.js.backup-XXXXX database.js`

---

## 📊 O QUE MUDOU

### ANTES (32 questões)
```
ética: 8
tributário: 8
penal: 8
processo civil: 8
constitucional: 0 ❌
processo penal: 0 ❌
civil: 0 ❌
trabalho: 0 ❌
administrativo: 0 ❌
consumidor: 0 ❌
empresarial: 0 ❌
direitos humanos: 0 ❌
TOTAL: 32 ❌
```

### DEPOIS (96 questões)
```
ética: 8 ✅
tributário: 8 ✅
penal: 8 ✅
processo civil: 8 ✅
constitucional: 8 ✅
processo penal: 8 ✅
civil: 8 ✅
trabalho: 8 ✅
administrativo: 8 ✅
consumidor: 8 ✅
empresarial: 8 ✅
direitos humanos: 8 ✅
TOTAL: 96 ✅
```

---

## 🎁 BÔNUS: Próximas Fases

Após este passo, você pode:

### FASE 2: Acordeões + localStorage (HTML/CSS/JS)
```bash
# Vou reescrever index.html, style.css, script.js
# Com:
# - Acordeões para modo estudo (4 tópicos/matéria)
# - localStorage para persistência
# - API.js para integração com backend futuro
```

### FASE 3: Backend (Node.js + Express)
```bash
# Criar API REST para:
# - GET /api/questions?materia=X
# - POST /api/progress
# - POST /api/pdf-upload (futuro)
```

### FASE 4: PDF → IA → Questões (n8n)
```bash
# Workflow automático:
# 1. Usuário envia PDF (WhatsApp ou web)
# 2. n8n processa com Python (OCR)
# 3. Claude gera 8+ questões
# 4. Salva em PostgreSQL
# 5. Aparece na web em tempo real
```

---

## 💬 PERGUNTAS?

Se o script falhar, execute com debug:
```bash
node --trace-uncaught merge-questoes.js questoes-template.json
```

Ou me avise qual erro recebeu! 🚀

---

## ⏰ RESUMO EXECUTIVO

| Passo | Ação | Tempo |
|-------|------|-------|
| 1 | `node merge-questoes.js questoes-template.json` | 10s |
| 2 | Validar no navegador (F12) | 30s |
| 3 | `git add database.js` | 5s |
| 4 | `git commit -m "feat: Add 64 questions..."` | 5s |
| 5 | `git push -u origin claude/oab-study-platform-CYZYK` | 10s |
| **TOTAL** | **Sistema com 96 questões funcionando** | **~1 minuto** ⚡ |

---

**🎯 VOCÊ ESTÁ AQUI → Próximo passo: Rodar `node merge-questoes.js questoes-template.json`**

Quer que eu faça algo mais? Me avise o resultado! ✨
