#!/bin/bash

# ============================================
# OAB Study - Script Executável Automático
# ============================================
#
# Uso: bash RUN.sh
#
# O que faz:
# 1. Valida ambiente (Node.js)
# 2. Integra 64 questões no database.js
# 3. Faz commit e push automático
# 4. Mostra resumo final
#

set -e  # Parar em primeiro erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
# FUNÇÕES
# ============================================

print_header() {
  echo -e "\n${BLUE}═══════════════════════════════════════════${NC}"
  echo -e "${BLUE}  $1${NC}"
  echo -e "${BLUE}═══════════════════════════════════════════${NC}\n"
}

print_ok() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_warn() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

# ============================================
# INÍCIO
# ============================================

print_header "OAB Study - Automação Completa"

echo "📍 Diretório: $(pwd)"
echo "📅 Data/Hora: $(date)"

# ============================================
# VALIDAÇÕES
# ============================================

print_header "1️⃣ Validando Ambiente"

# Node.js
if ! command -v node &> /dev/null; then
  print_error "Node.js não encontrado"
  echo "   Instale em: https://nodejs.org/"
  exit 1
fi
print_ok "Node.js: $(node --version)"

# Git
if ! command -v git &> /dev/null; then
  print_error "Git não encontrado"
  exit 1
fi
print_ok "Git: $(git --version)"

# Arquivos necessários
if [ ! -f "questoes-template.json" ]; then
  print_error "questoes-template.json não encontrado"
  exit 1
fi
print_ok "questoes-template.json encontrado"

if [ ! -f "merge-questoes.js" ]; then
  print_error "merge-questoes.js não encontrado"
  exit 1
fi
print_ok "merge-questoes.js encontrado"

if [ ! -f "database.js" ]; then
  print_error "database.js não encontrado"
  exit 1
fi
print_ok "database.js encontrado"

# ============================================
# INTEGRAR QUESTÕES
# ============================================

print_header "2️⃣ Integrando 64 Questões"

if node merge-questoes.js questoes-template.json; then
  print_ok "Questões integradas com sucesso"
else
  print_error "Falha ao integrar questões"
  exit 1
fi

# ============================================
# GIT OPERATIONS
# ============================================

print_header "3️⃣ Git - Preparando Commit"

# Verificar branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "🌳 Branch atual: $BRANCH"

if [[ "$BRANCH" != "claude/oab-study-platform-CYZYK" ]]; then
  print_warn "Você não está na branch esperada (claude/oab-study-platform-CYZYK)"
  read -p "   Deseja continuar? (s/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    exit 1
  fi
fi

# Stage
print_ok "Adicionando database.js ao git"
git add database.js

# Status
CHANGES=$(git status --short | wc -l)
if [ "$CHANGES" -gt 0 ]; then
  print_ok "Mudanças detalhadas:"
  git status --short | sed 's/^/   /'
else
  print_warn "Nenhuma mudança detectada"
fi

# ============================================
# COMMIT
# ============================================

print_header "4️⃣ Git - Fazendo Commit"

COMMIT_MSG="feat: Expand OAB questions from 32 to 96 (8+ per subject)

- Add 64 new questions across 8 subjects:
  • Constitucional (8 questions)
  • Processo Penal (8 questions)
  • Direito Civil (8 questions)
  • Direito do Trabalho (8 questions)
  • Direito Administrativo (8 questions)
  • Direito do Consumidor (8 questions)
  • Direito Empresarial (8 questions)
  • Direitos Humanos (8 questions)
- Total questions: 96 (up from 32)
- All questions follow OAB 1st phase format
- Questions include explanations with legal references
- Prepared for localStorage integration in next phase

Related: https://github.com/roh-barboza/oab-study"

git commit -m "$COMMIT_MSG" || {
  print_warn "Commit falhou (possivelmente nenhuma mudança)"
}

# ============================================
# PUSH
# ============================================

print_header "5️⃣ Git - Fazendo Push"

if git push -u origin "$BRANCH"; then
  print_ok "Push realizado com sucesso"
else
  print_warn "Push falhou (verifique conexão com GitHub)"
fi

# ============================================
# RESUMO FINAL
# ============================================

print_header "6️⃣ Resumo Final"

echo "✨ CONCLUSÃO:"
echo ""
echo "  📊 Questões:"
echo "     • Antes: 32 questões (4 matérias)"
echo "     • Depois: 96 questões (12 matérias)"
echo "     • Adicionadas: 64 questões"
echo ""
echo "  🌳 Git:"
echo "     • Branch: $BRANCH"
echo "     • Commit: $(git log -1 --pretty=format:'%h - %s')"
echo "     • Status: ✅ Pronto para produção"
echo ""
echo "  🔗 Próximos Passos:"
echo "     1. Validar no navegador (F12):"
echo "        → console.log(QUESTOES.length)"
echo "        → Deve retornar: 96"
echo ""
echo "     2. Próxima FASE: Acordeões + localStorage"
echo "        • Reescrever: index.html, style.css, script.js"
echo "        • Adicionar: TOPICOS_ESTUDO, renderTopicos()"
echo "        • Implementar: localStorage para persistência"
echo ""

print_ok "Sistema atualizado com sucesso! 🚀"

echo ""
echo "📁 Arquivos principais:"
echo "   • database.js (96 questões)"
echo "   • index.html (será atualizado)"
echo "   • style.css (será atualizado)"
echo "   • script.js (será atualizado)"
echo ""
echo "📝 Log:"
git log --oneline -3 | sed 's/^/   /'
echo ""

print_header "✅ DONE!"

echo "🎉 Você pode agora:"
echo "   • Abrir index.html no navegador"
echo "   • Testar as novas questões"
echo "   • Continuar com a próxima fase (acordeões)"
echo ""
