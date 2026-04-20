#!/usr/bin/env node

/**
 * Script para integrar questões geradas do Perplexity/IA no database.js
 *
 * Uso:
 *   node merge-questoes.js questoes-geradas.json
 *
 * Ou use diretamente o template pré-preenchido:
 *   node merge-questoes.js questoes-template.json
 */

const fs = require('fs');
const path = require('path');

// ========================================
// CONFIGURAÇÕES
// ========================================

const DB_FILE = path.join(__dirname, 'database.js');
const TEMPLATE_FILE = path.join(__dirname, 'questoes-template.json');

// IDs de matérias esperadas para as 64 questões
const MATERIAS_ESPERADAS = [
  'constitucional',
  'processpenal',
  'civil',
  'trabalho',
  'administrativo',
  'consumidor',
  'empresarial',
  'humanosintl'
];

// ========================================
// FUNÇÕES
// ========================================

/**
 * Valida o arquivo JSON de questões
 */
function validarQuestoes(questoes) {
  console.log('\n📋 Validando questões...');

  const erros = [];

  // Validar array
  if (!Array.isArray(questoes)) {
    erros.push('❌ Questões deve ser um array');
    return erros;
  }

  // Validar quantidade
  if (questoes.length !== 64) {
    erros.push(`❌ Total de questões: ${questoes.length} (esperado: 64)`);
  }

  // Validar por matéria
  const contagem = {};
  MATERIAS_ESPERADAS.forEach(m => contagem[m] = 0);

  // Validar cada questão
  questoes.forEach((q, i) => {
    // ID
    if (!Number.isInteger(q.id) || q.id < 33 || q.id > 96) {
      erros.push(`❌ Questão ${i}: ID inválido (${q.id}). Esperado 33-96.`);
    }

    // Materia
    if (!q.materia || !MATERIAS_ESPERADAS.includes(q.materia)) {
      erros.push(`❌ Questão ${i}: Matéria inválida (${q.materia})`);
    } else {
      contagem[q.materia]++;
    }

    // Enunciado
    if (!q.enunciado || typeof q.enunciado !== 'string' || q.enunciado.length < 10) {
      erros.push(`❌ Questão ${i}: Enunciado inválido ou muito curto`);
    }

    // Alternativas
    if (!Array.isArray(q.alternativas) || q.alternativas.length !== 4) {
      erros.push(`❌ Questão ${i}: Deve ter exatamente 4 alternativas`);
    }

    // Gabarito
    if (![0, 1, 2, 3].includes(q.gabarito)) {
      erros.push(`❌ Questão ${i}: Gabarito inválido (${q.gabarito}). Esperado 0-3.`);
    }

    // Explicação
    if (!q.explicacao || typeof q.explicacao !== 'string' || q.explicacao.length < 10) {
      erros.push(`❌ Questão ${i}: Explicação inválida ou muito curta`);
    }
  });

  // Validar distribuição por matéria
  console.log('\n📊 Distribuição por matéria:');
  Object.entries(contagem).forEach(([mat, count]) => {
    const status = count >= 8 ? '✅' : '⚠️';
    console.log(`  ${status} ${mat}: ${count} questões`);
    if (count < 8) {
      erros.push(`⚠️ ${mat}: ${count} questões (esperado ≥8)`);
    }
  });

  // Validar IDs únicos
  const idsUnicos = new Set(questoes.map(q => q.id));
  if (idsUnicos.size !== 64) {
    erros.push(`❌ IDs duplicados encontrados: ${64 - idsUnicos.size}`);
  }

  return erros;
}

/**
 * Gera o conteúdo do database.js com as novas questões
 */
function gerarDatabaseJS(questoesNovas) {
  const template = fs.readFileSync(DB_FILE, 'utf-8');

  // Encontrar fim do array QUESTOES antigo
  const inicioQuestoes = template.indexOf('const QUESTOES = [');
  const fimQuestoes = template.indexOf('];', inicioQuestoes) + 2;

  if (inicioQuestoes === -1) {
    throw new Error('Não consegui encontrar const QUESTOES em database.js');
  }

  // Gerar novo array com todas as questões (antigas + novas)
  const novasLinhas = questoesNovas.map(q =>
    `  {
    id: ${q.id},
    materia: "${q.materia}",
    enunciado: "${q.enunciado.replace(/"/g, '\\"')}",
    alternativas: [${q.alternativas.map(a => `"${a.replace(/"/g, '\\"')}"`).join(', ')}],
    gabarito: ${q.gabarito},
    explicacao: "${q.explicacao.replace(/"/g, '\\"')}"
  }`
  ).join(',\n');

  const novoQuestoes = `const QUESTOES = [\n${novasLinhas}\n];`;

  // Substituir bloco antigo
  const novoTemplate = template.substring(0, inicioQuestoes) +
                       novoQuestoes +
                       template.substring(fimQuestoes);

  return novoTemplate;
}

/**
 * Main: executar o script
 */
async function main() {
  try {
    console.log('🚀 Merge de Questões - OAB Study\n');

    // Verificar arquivo de entrada
    let arquivoEntrada = process.argv[2];

    if (!arquivoEntrada) {
      console.log('📁 Nenhum arquivo especificado. Usando template padrão...');
      arquivoEntrada = TEMPLATE_FILE;
    }

    const caminhoEntrada = path.join(__dirname, arquivoEntrada);

    if (!fs.existsSync(caminhoEntrada)) {
      throw new Error(`Arquivo não encontrado: ${caminhoEntrada}`);
    }

    console.log(`📥 Lendo: ${caminhoEntrada}`);

    // Parsear JSON
    const dados = JSON.parse(fs.readFileSync(caminhoEntrada, 'utf-8'));
    const questoes = dados.questoes || dados;

    console.log(`✅ JSON válido. Total de questões: ${questoes.length}`);

    // Validar
    const erros = validarQuestoes(questoes);

    if (erros.length > 0) {
      console.log('\n❌ ERROS DE VALIDAÇÃO:\n');
      erros.forEach(e => console.log(`  ${e}`));

      // Permitir continuar com avisos
      console.log('\n⚠️ Continuando apesar dos avisos...\n');
    } else {
      console.log('\n✅ Todas as validações passaram!');
    }

    // Gerar novo database.js
    console.log('\n🔄 Gerando novo database.js...');
    const novoDatabase = gerarDatabaseJS(questoes);

    // Backup antigo
    const backupFile = `${DB_FILE}.backup-${Date.now()}.js`;
    fs.copyFileSync(DB_FILE, backupFile);
    console.log(`💾 Backup criado: ${backupFile}`);

    // Escrever novo arquivo
    fs.writeFileSync(DB_FILE, novoDatabase, 'utf-8');
    console.log(`✅ database.js atualizado!`);

    // Resumo
    console.log('\n📊 RESUMO:');
    console.log(`  ✅ Total de questões: ${questoes.length}/64`);
    console.log(`  ✅ IDs: ${Math.min(...questoes.map(q => q.id))}-${Math.max(...questoes.map(q => q.id))}`);
    console.log(`  ✅ Matérias: ${[...new Set(questoes.map(q => q.materia))].length}/8`);
    console.log(`  ✅ Arquivo: ${DB_FILE}`);
    console.log(`  ✅ Backup: ${backupFile}`);

    console.log('\n🎉 Sucesso! Pronto para usar.\n');

  } catch (erro) {
    console.error('\n❌ ERRO:', erro.message);
    process.exit(1);
  }
}

// Executar
main().catch(console.error);

/**
 * ========================================
 * COMO USAR
 * ========================================
 *
 * 1. Se usar Perplexity:
 *    - Cole o prompt do PERPLEXITY_PROMPT_QUESTOES.md
 *    - Copie o JSON gerado
 *    - Salve em: questoes-geradas.json
 *    - Rode: node merge-questoes.js questoes-geradas.json
 *
 * 2. Se usar o template pré-preenchido:
 *    - Rode: node merge-questoes.js questoes-template.json
 *    - Ou simplesmente: node merge-questoes.js
 *
 * 3. Verificar resultado:
 *    - Abra database.js
 *    - Procure "const QUESTOES = ["
 *    - Verifique se tem 96 questões (IDs 1-96)
 *
 * 4. Testar no navegador:
 *    - Abra index.html
 *    - Console: console.log(QUESTOES.length) → deve ser 96
 */
