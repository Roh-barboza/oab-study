# 🎓 Prompt Executável para Perplexity - Gerar 64 Questões OAB

## ⚠️ INSTRUÇÕES

1. **Copie TODO o conteúdo deste arquivo**
2. **Cole no Perplexity** (https://www.perplexity.ai/)
3. **Envie como prompt**
4. **Perplexity vai gerar as 64 questões em JSON**
5. **Copie o JSON de resposta e salve em `questoes-geradas.json`**

---

## PROMPT PARA O PERPLEXITY

```
Você é um especialista em exames da OAB e desenvolvedor JavaScript. 
Sua tarefa é gerar um banco de dados de questões de múltipla escolha para 8 matérias de direito.

REQUISITOS OBRIGATÓRIOS:
1. Gere EXATAMENTE 8 questões por matéria (64 questões no total)
2. Cada questão deve ter EXATAMENTE 4 alternativas (A, B, C, D)
3. Nível de dificuldade COMPATÍVEL com a 1ª fase da OAB
4. Output DEVE ser um array JSON válido, pronto para JavaScript
5. IDs devem ser sequenciais: 33-96 (continuando dos 32 anteriores)

ESTRUTURA DE CADA QUESTÃO:
{
  id: número único (33-96),
  materia: "id_da_materia",
  enunciado: "texto da pergunta",
  alternativas: ["A) texto opção 1", "B) texto opção 2", "C) texto opção 3", "D) texto opção 4"],
  gabarito: número (0, 1, 2 ou 3 = índice da alternativa correta),
  explicacao: "texto explicativo baseado na lei/doutrina"
}

---

CONTEÚDO BASE PARA GERAR AS QUESTÕES:

### MATÉRIA 1: DIREITO CONSTITUCIONAL (IDs: 33-40)

**Remédios Constitucionais:**
- HC (Habeas Corpus): liberdade de locomoção
- MS (Mandado de Segurança): direito líquido e certo, não amparado por HC/HD
- MI (Mandado de Injunção): omissão normativa
- HD (Habeas Data): dados pessoais
- AP (Ação Popular): ato lesivo ao patrimônio público

**Direitos Fundamentais:**
- Aplicação imediata (art. 5°)
- Cláusula pétrea (não podem ser alterados nem por emenda)
- Eficácia horizontal (entre particulares)

**Controle de Constitucionalidade:**
- Difuso: qualquer juiz, efeitos inter partes
- Concentrado (STF): ADI, ADC, ADPF, ADO → efeitos erga omnes e vinculante

**Organização do Estado:**
- União indissolúvel
- Municípios integram a federação
- DF acumula competências estaduais e municipais

**Poderes:**
- Executivo: mandato 4 anos, reeleição 1 vez. Responsabilização: STF (crimes comuns) + Senado (crimes de responsabilidade)
- Legislativo: Senado (3 por estado, 8 anos) + Câmara (proporcional, 4 anos)
- Judiciário: STF guarda da CF, STJ uniformiza lei federal, TSE/TST/STM especializados

---

### MATÉRIA 2: PROCESSO PENAL (IDs: 41-48)

**Inquérito Policial (EISIOID):**
- Escrito, Inquisitivo, Sigiloso, Oficial, Oficioso, Indisponível, Dispensável

**Prazos IP:**
- Justiça Estadual: 10 dias (preso) / 30 dias (solto)
- Justiça Federal: 15 dias (preso) / 30 dias (solto)
- Drogas: 30 dias (preso) / 90 dias (solto)

**Ação Penal Pública:**
- Obrigatoriedade, Indisponibilidade, Oficialidade, Divisibilidade

**Ação Penal Privada:**
- Oportunidade, Disponibilidade, Indivisibilidade
- Extinção: decadência (6m), renúncia, perdão aceito, perempção, morte do querelante

**Prisão em Flagrante:**
- Próprio, Impróprio, Presumido
- Flagrante esperado = válido
- Flagrante provocado = inválido

**Prisão Temporária:**
- Crimes comuns: 5 dias
- Crimes hediondos: 30 dias
- Só na fase de investigação
- Juiz não decreta de ofício

**Prisão Preventiva:**
- Qualquer fase do processo
- Só se crime doloso com pena máxima > 4 anos
- Juiz não decreta de ofício

**Prova Ilícita:**
- Inadmissível (art. 5º, LVI CF)
- Teoria dos frutos da árvore envenenada
- Exceção: única prova de inocência

**Júri:**
- Plenitude de defesa
- Sigilo das votações
- Soberania dos vereditos
- Competência: crimes dolosos contra a vida

---

### MATÉRIA 3: DIREITO CIVIL (IDs: 49-56)

**Pessoa Natural:**
- Capacidade absoluta aos 18 anos
- Relativamente incapazes: 16-18 anos, ébrios habituais, pródigos

**Prescrição:**
- 3 anos: reparação civil
- 5 anos: dívidas em geral
- 10 anos: geral
- Decadência NÃO se suspende

**Responsabilidade Civil:**
- Subjetiva: dolo/culpa (regra)
- Objetiva: risco/lei (exceção)
- Nexo causal: obrigatório em ambas

**Família:**
- Casamento, união estável, família monoparental
- União estável: convivência pública, contínua, duradoura
- Efeitos: regime de bens, herança, sucessão

**Sucessão:**
- Legítima: herdeiros necessários (descendentes, ascendentes, cônjuge)
- Testamentária
- Legítima = mínimo 50% do patrimônio

---

### MATÉRIA 4: DIREITO DO TRABALHO (IDs: 57-64)

**Princípios:**
- Proteção (in dubio pro operário)
- Primazia da realidade
- Irrenunciabilidade

**Jornada:**
- 8h/dia, 44h/semana (regra)
- Hora extra: mínimo 50%
- Noturno: 22h-5h, adicional mínimo 20%

**FGTS:**
- 8% do salário
- Saque: demissão sem justa causa, aposentadoria, doença grave, etc.

**Estabilidade:**
- Gestante: confirmação até 5 meses após parto
- CIPA: desde registro candidatura

**Prescrição:**
- 2 anos (após extinção contrato para ajuizar)
- 5 anos (créditos retroativos)

**Teletrabalho:**
- Subordinação mantida
- Controle de jornada é facultativo (acordo escrito)

---

### MATÉRIA 5: DIREITO ADMINISTRATIVO (IDs: 65-72)

**Princípios (LIMPE):**
- Legalidade: submissão à lei
- Impessoalidade: sem preferências pessoais
- Moralidade: honestidade administrativa
- Publicidade: acesso público aos atos
- Eficiência: melhor resultado com menos custo

**Atos Administrativos:**
- Autoexecutórios
- Presunção de legitimidade
- Imperatividade
- Revogação (mérito)
- Anulação (ilegalidade)

**Licitação:**
- Concorrência, tomada de preços, convite, pregão, leilão, concurso
- Dispensa (art. 24)
- Inexigibilidade (art. 25)

**Improbidade Administrativa:**
- Enriquecimento ilícito
- Dano ao erário
- Violação de princípios
- Sanções: perda do cargo, suspensão direitos, multa

**Responsabilidade Civil do Estado:**
- Objetiva (teoria do risco administrativo)
- Exceção: força maior, culpa exclusiva da vítima

**Servidores Públicos:**
- Estabilidade: após 3 anos
- Perda do cargo: processo administrativo, sentença judicial, avaliação periódica

---

### MATÉRIA 6: DIREITO DO CONSUMIDOR (IDs: 73-80)

**Vulnerabilidade:**
- Presumida (consumidor é a parte fraca)
- Hipervulnerável: idosos, crianças, deficientes

**Responsabilidade por Fato do Produto/Serviço:**
- Objetiva e solidária (fabricante + distribuidor + loja)

**Responsabilidade por Vício:**
- Produto durável: 90 dias
- Produto não durável: 30 dias
- Obrigação: reparar, substituir ou restituir

**Práticas Abusivas:**
- Venda casada: proibida
- Cláusulas abusivas: nulas de pleno direito (art. 51 CDC)

**Inversão do Ônus da Prova:**
- A critério do juiz
- Verossimilhança das alegações
- Hipossuficiência do consumidor

---

### MATÉRIA 7: DIREITO EMPRESARIAL (IDs: 81-88)

**Empresário:**
- Atividade econômica organizada, habitual, profissional
- Registro na Junta Comercial (obrigatório)

**Sociedade Limitada:**
- Responsabilidade limitada ao capital
- Administração por sócio ou terceiro
- Capital dividido em quotas

**Títulos de Crédito:**
- Literalidade (valor = o que está escrito)
- Cartularidade (necessário ter o documento)
- Autonomia (cada obrigação é independente)
- Cheque: à vista, prescrição 6m (portador) / 2 anos (ação enriquecimento)

**Falência:**
- Insolvência (débitos > bens)
- Competência: juiz especializado em insolvência

**Recuperação Judicial:**
- Plano em 60 dias
- Aprovação por credores (maioria simples)

**Desconsideração da Personalidade Jurídica:**
- Abuso de direito
- Confusão patrimonial
- Desvio de finalidade

---

### MATÉRIA 8: DIREITOS HUMANOS (IDs: 89-96)

**Gerações de Direitos:**
- 1ª geração: civis/políticos (liberdade)
- 2ª geração: sociais/econômicos (igualdade)
- 3ª geração: difusos/coletivos (fraternidade)

**Pacto de São José da Costa Rica (CADH):**
- Proíbe prisão por dívida (exceção: alimentos)
- Tribunal: Corte Interamericana de Direitos Humanos (Corte IDH)
- Ratificado pelo Brasil

**Características dos Direitos Humanos:**
- Universalidade
- Indivisibilidade
- Interdependência
- Imprescritibilidade
- Inalienabilidade

**Aplicação no Brasil:**
- Tratados internacionais ratificados = força de lei
- Direitos humanos = cláusula pétrea (art. 60, § 4º CF)
- Controle de convencionalidade (STF)

---

OUTPUT ESPERADO:

Você deve retornar um arquivo JSON com EXATAMENTE 64 questões no formato abaixo:

\`\`\`json
[
  {
    "id": 33,
    "materia": "constitucional",
    "enunciado": "Qual remédio constitucional é apropriado para proteger informações pessoais?",
    "alternativas": [
      "A) Habeas Corpus",
      "B) Habeas Data",
      "C) Mandado de Segurança",
      "D) Mandado de Injunção"
    ],
    "gabarito": 1,
    "explicacao": "Habeas Data é o remédio para acessar, corrigir ou deletar informações pessoais (art. 5º, LXXII CF)."
  },
  {
    "id": 34,
    "materia": "constitucional",
    "enunciado": "...",
    "alternativas": [...],
    "gabarito": 0,
    "explicacao": "..."
  },
  // ... continuar até ID 96
]
\`\`\`

CRITÉRIOS DE QUALIDADE:
✅ Cada questão deve ser sobre tópicos reais do conteúdo
✅ Gabarito deve estar correto (verificar 2x)
✅ Explicação deve citar lei/artigo específico
✅ Alternativas devem ser plausíveis (falsos positivos realistas)
✅ Nível: 1ª fase OAB (nem muito fácil, nem muito difícil)

COMECE A GERAR AGORA! Por favor, retorne apenas o array JSON, sem explicações adicionais.
```

---

## 📝 Como Usar

1. **Copie o PROMPT acima** (tudo entre as 3 aspas)
2. **Abra https://www.perplexity.ai/**
3. **Cole o prompt** na caixa de chat
4. **Pressione Enter**
5. **Aguarde a resposta** (~2-3 minutos)
6. **Copie o JSON** que o Perplexity gerar
7. **Salve em um arquivo** chamado `questoes-geradas.json`
8. **Me avise** quando tiver pronto!

---

## ✅ Validação

Após o Perplexity gerar as questões, verifique:

- [ ] Total de 64 questões
- [ ] IDs de 33-96 sem duplicatas
- [ ] 8 questões por matéria (33-40=etica, 41-48=processpenal, etc)
- [ ] Cada questão tem 4 alternativas
- [ ] Gabarito é 0, 1, 2 ou 3
- [ ] Explicação menciona a lei/artigo
- [ ] JSON é válido (teste em https://jsonlint.com/)

---

## 🚀 Próximo Passo

Quando tiver o JSON gerado:
1. Salve em `questoes-geradas.json`
2. Eu vou integrar no `database.js`
3. Faremos commit e push
4. O sistema ficará com 96 questões funcionais!

---

## ⚡ Alternativa (se Perplexity falhar)

Se o Perplexity não gerar um JSON válido, eu posso:
1. Gerar as questões manualmente
2. Usar Claude API diretamente
3. Usar outro provider de IA

Mas tente primeiro com o Perplexity - é grátis e rápido! 🎯
