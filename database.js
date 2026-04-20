// ============================================
// DATABASE.JS - Banco de Dados do OAB Study
// ============================================
// Este arquivo contém toda a estrutura de dados:
// - Matérias e seus resumos
// - Flashcards
// - Questões (será preenchido pelo Claude)

// MATÉRIAS COM RESUMOS
const MATERIAS = [
  {
    id: "etica",
    nome: "Ética Profissional",
    descricao: "Estatuto da Ordem dos Advogados do Brasil",
    acuracia: 82,
    questoesFeitas: 44,
    resumo: `
      <strong>Prerrogativas do Advogado:</strong> Inviolabilidade do escritório (quebrada apenas com indícios de crime do advogado + mandado específico), comunicação com cliente preso (sem procuração), entrevista sem hora marcada com magistrados.
      
      <strong>Advogado Preso:</strong> Sala de Estado-Maior antes do trânsito em julgado; após trânsito = sem privilégio.
      
      <strong>Sigilo Profissional:</strong> Dever absoluto, exceção por justa causa (grave ameaça à vida/honra ou defesa própria). Violação = censura.
      
      <strong>Honorários:</strong> Convencionais, arbitrados, sucumbenciais, assistenciais. Prescrição: 5 anos. Contrato tem eficácia de título executivo extrajudicial. Natureza alimentar.
      
      <strong>Pacto Quota Litis:</strong> Honorários baseados na vantagem financeira, devem ser em pecúnia, não podem superar as vantagens do cliente.
      
      <strong>Sanções Disciplinares:</strong> Censura → Suspensão (30 dias a 12 meses) → Exclusão. Multa: 1 a 10 anuidades. Prescrição: 5 anos.
    `
  },
  {
    id: "tributario",
    nome: "Direito Tributário",
    descricao: "Princípios, imunidades e obrigações tributárias",
    acuracia: 71,
    questoesFeitas: 36,
    resumo: `
      <strong>Princípio da Legalidade:</strong> Tributos criados/extintos por lei. MP pode criar imposto (lei ordinária) mas não lei complementar.
      
      <strong>Anterioridade:</strong> Anual + nonagesimal (90 dias). Exceções imediatas: II, IE, IOF, IEG, ECGC. Só nonagesimal: IPI, CIDE, ICMS-comb. Só anual: IR, IPVA (base), IPTU (base).
      
      <strong>Imunidades:</strong> Recíproca entre entes federativos + autarquias/fundações. OAB tem imunidade, Caixa de Assistência não. Templos incluem aluguel e estacionamento.
      
      <strong>Competência Tributária:</strong> Indelegável, incaducável, inalterável, irrenunciável, facultativa. Capacidade tributária (arrecadar) é delegável.
      
      <strong>Extinção do Crédito:</strong> Pagamento, compensação, transação, remissão, prescrição/decadência, conversão depósito, homologação, consignação.
    `
  },
  {
    id: "penal",
    nome: "Direito Penal",
    descricao: "Crimes, penas e excludentes de ilicitude",
    acuracia: 68,
    questoesFeitas: 30,
    resumo: `
      <strong>Dolo:</strong> Direto (quer o resultado) e eventual (assume o risco).
      
      <strong>Culpa:</strong> Imprudência, negligência, imperícia.
      
      <strong>Tentativa:</strong> Início de execução + não consumação por circunstâncias alheias. Pena: 1/3 a 2/3 menor.
      
      <strong>Excludentes de Ilicitude:</strong> Legítima defesa, estado de necessidade, estrito cumprimento do dever legal, exercício regular de direito.
      
      <strong>Excludentes de Culpabilidade:</strong> Inimputabilidade (doença mental/menor 18 anos), embriaguez acidental completa, coação moral irresistível, obediência hierárquica.
      
      <strong>Prescrição Penal:</strong> Pena máxima até 1 ano = 3 anos; 1-2 anos = 4 anos; 2-4 anos = 8 anos; 4-8 anos = 12 anos; 8-12 anos = 16 anos; acima de 12 anos = 20 anos.
    `
  },
  {
    id: "processocivil",
    nome: "Processo Civil",
    descricao: "Tutela de urgência, recursos e execução",
    acuracia: 74,
    questoesFeitas: 27,
    resumo: `
      <strong>Tutela de Urgência:</strong> Fumus boni iuris + periculum in mora. Pode ser antecipada ou cautelar.
      
      <strong>Litisconsórcio:</strong> Necessário (obrigatório por lei/natureza) e facultativo. Unitário (decisão uniforme) e simples.
      
      <strong>Recursos:</strong> Apelação, agravo de instrumento, agravo interno, embargos de declaração (omissão, contradição, obscuridade, erro material), REsp (STJ), RE (STF).
      
      <strong>IRDR:</strong> Incidente de resolução de demandas repetitivas — suspende processos, forma tese vinculante.
      
      <strong>Execução:</strong> Título executivo judicial (cumprimento de sentença) e extrajudicial. Penhora segue ordem legal.
    `
  },
  {
    id: "constitucional",
    nome: "Direito Constitucional",
    descricao: "Remédios constitucionais e direitos fundamentais",
    acuracia: 66,
    questoesFeitas: 22,
    resumo: `
      <strong>Remédios Constitucionais:</strong> HC (liberdade locomoção), MS (direito líquido e certo), MI (omissão normativa), HD (dados pessoais), AP (ato lesivo ao patrimônio público).
      
      <strong>Direitos Fundamentais:</strong> Aplicação imediata (art. 5°). Cláusula pétrea. Eficácia horizontal (entre particulares).
      
      <strong>Controle de Constitucionalidade:</strong> Difuso (qualquer juiz, efeitos inter partes) e concentrado (STF: ADI, ADC, ADPF, ADO — efeitos erga omnes).
      
      <strong>Organização do Estado:</strong> União indissolúvel. Municípios integram a federação. DF acumula competências estaduais e municipais.
      
      <strong>Poderes:</strong> Executivo (mandato 4 anos, reeleição 1 vez). Legislativo (Senado 3 por estado, 8 anos; Câmara proporcional, 4 anos). Judiciário (STF guarda da CF).
    `
  },
  {
    id: "processpenal",
    nome: "Processo Penal",
    descricao: "Inquérito policial, ação penal e prisão",
    acuracia: 79,
    questoesFeitas: 19,
    resumo: `
      <strong>Inquérito Policial:</strong> Escrito, inquisitivo, sigiloso, oficial, oficioso, indisponível, dispensável (EISIOID).
      
      <strong>Prazos IP:</strong> Justiça Estadual (preso 10d / solto 30d), Federal (preso 15d / solto 30d), Drogas (preso 30d / solto 90d).
      
      <strong>Ação Penal Pública:</strong> Obrigatoriedade, indisponibilidade, oficialidade, divisibilidade.
      
      <strong>Ação Penal Privada:</strong> Oportunidade, disponibilidade, indivisibilidade. Extinção: decadência (6m), renúncia, perdão aceito, perempção, morte do querelante.
      
      <strong>Prisão:</strong> Flagrante (próprio, impróprio, presumido), temporária (5-30 dias), preventiva (qualquer fase). Prova ilícita inadmissível.
    `
  },
  {
    id: "civil",
    nome: "Direito Civil",
    descricao: "Pessoas, prescrição e responsabilidade civil",
    acuracia: 73,
    questoesFeitas: 24,
    resumo: `
      <strong>Pessoa Natural:</strong> Capacidade absoluta aos 18 anos. Relativamente incapazes: 16-18 anos, ébrios habituais, pródigos.
      
      <strong>Prescrição:</strong> 3 anos (reparação civil), 5 anos (dívidas em geral), 10 anos (geral). Decadência não se suspende.
      
      <strong>Responsabilidade Civil:</strong> Subjetiva (dolo/culpa) e objetiva (risco/lei). Nexo causal obrigatório.
      
      <strong>Família:</strong> Casamento, união estável, família monoparental. União estável: convivência pública, contínua e duradoura.
      
      <strong>Sucessão:</strong> Legítima (herdeiros necessários: descendentes, ascendentes, cônjuge) e testamentária. Legítima = 50% do patrimônio.
    `
  },
  {
    id: "trabalho",
    nome: "Direito do Trabalho",
    descricao: "Jornada, FGTS e direitos trabalhistas",
    acuracia: 61,
    questoesFeitas: 18,
    resumo: `
      <strong>Princípios:</strong> Proteção (in dubio pro operário), primazia da realidade, irrenunciabilidade.
      
      <strong>Jornada:</strong> 8h/dia, 44h/semana. Hora extra: mínimo 50%. Noturno: entre 22h e 5h, adicional 20%.
      
      <strong>FGTS:</strong> 8% do salário. Saque: demissão sem justa causa, aposentadoria, doença grave, etc.
      
      <strong>Estabilidade Gestante:</strong> Da confirmação até 5 meses após o parto. CIPA: desde registro candidatura.
      
      <strong>Prescrição:</strong> 2 anos após extinção contrato para ajuizar; 5 anos de créditos retroativos. Teletrabalho: subordinação mantida.
    `
  },
  {
    id: "administrativo",
    nome: "Direito Administrativo",
    descricao: "Princípios, atos administrativos e licitação",
    acuracia: 71,
    questoesFeitas: 36,
    resumo: `
      <strong>Princípios (LIMPE):</strong> Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência.
      
      <strong>Atos Administrativos:</strong> Autoexecutórios, presunção de legitimidade, imperatividade. Revogação (mérito) e anulação (ilegalidade).
      
      <strong>Licitação:</strong> Concorrência, tomada de preços, convite, pregão, leilão, concurso. Dispensa e inexigibilidade.
      
      <strong>Improbidade Administrativa:</strong> Enriquecimento ilícito, dano ao erário, violação de princípios. Perda do cargo, suspensão direitos, multa.
      
      <strong>Responsabilidade Civil do Estado:</strong> Objetiva (teoria do risco administrativo). Exceção: força maior, culpa exclusiva da vítima.
    `
  },
  {
    id: "consumidor",
    nome: "Direito do Consumidor",
    descricao: "Vulnerabilidade e responsabilidade",
    acuracia: 58,
    questoesFeitas: 14,
    resumo: `
      <strong>Vulnerabilidade do Consumidor:</strong> Presumida. Hipervulnerável: idosos, crianças, deficientes.
      
      <strong>Responsabilidade por Fato:</strong> Objetiva e solidária (produto/serviço).
      
      <strong>Responsabilidade por Vício:</strong> Produto durável 90 dias, não durável 30 dias.
      
      <strong>Práticas Abusivas:</strong> Venda casada proibida, cláusulas abusivas nulas de pleno direito.
      
      <strong>Inversão do Ônus da Prova:</strong> A critério do juiz (verossimilhança ou hipossuficiência).
    `
  },
  {
    id: "empresarial",
    nome: "Direito Empresarial",
    descricao: "Empresário, sociedades e títulos de crédito",
    acuracia: 64,
    questoesFeitas: 20,
    resumo: `
      <strong>Empresário:</strong> Atividade econômica organizada, habitual, profissional. Registro na Junta Comercial.
      
      <strong>Sociedade Limitada:</strong> Responsabilidade limitada ao capital. Administração pode ser por sócio ou terceiro.
      
      <strong>Títulos de Crédito:</strong> Literalidade, cartularidade, autonomia. Cheque: à vista, prescrição 6m (portador) / 2 anos (ação enriquecimento).
      
      <strong>Falência:</strong> Insolvência. Recuperação judicial: plano em 60 dias, aprovação por credores.
      
      <strong>Desconsideração da Personalidade Jurídica:</strong> Abuso de direito, confusão patrimonial, desvio de finalidade.
    `
  },
  {
    id: "humanosintl",
    nome: "Direitos Humanos",
    descricao: "Gerações de direitos e convenções internacionais",
    acuracia: 62,
    questoesFeitas: 16,
    resumo: `
      <strong>Gerações de Direitos:</strong> 1ª (civis/políticos - liberdade), 2ª (sociais/econômicos - igualdade), 3ª (difusos - fraternidade).
      
      <strong>Pacto de São José (CADH):</strong> Proíbe prisão por dívida (exceto alimentos). Tribunal: Corte IDH.
      
      <strong>Características:</strong> Universalidade, indivisibilidade, interdependência, imprescritibilidade, inalienabilidade.
      
      <strong>Aplicação:</strong> Tratados internacionais ratificados pelo Brasil têm força de lei. Direitos humanos são cláusula pétrea.
    `
  }
];

// FLASHCARDS (será expandido com conteúdo real)
const FLASHCARDS = [
  {
    materia: "etica",
    pergunta: "Qual é a sanção disciplinar mais grave?",
    resposta: "Exclusão, aplicada nas hipóteses legais mais severas dentro do regime disciplinar do EOAB."
  },
  {
    materia: "administrativo",
    pergunta: "Quais são os princípios da administração pública?",
    resposta: "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência."
  },
  {
    materia: "penal",
    pergunta: "Qual a diferença central entre roubo e extorsão?",
    resposta: "Na extorsão, a participação da vítima é indispensável; no roubo, não."
  },
  {
    materia: "processocivil",
    pergunta: "Qual o prazo geral dos recursos no CPC?",
    resposta: "Em regra, 15 dias úteis, com exceção dos embargos de declaração."
  },
  {
    materia: "constitucional",
    pergunta: "O que é uma cláusula pétrea?",
    resposta: "Disposição constitucional que não pode ser alterada nem mesmo por emenda constitucional."
  },
  {
    materia: "trabalho",
    pergunta: "Qual a jornada máxima diária?",
    resposta: "8 horas por dia, 44 horas por semana, conforme CLT."
  }
];

// QUESTÕES - SERÁ PREENCHIDO PELO CLAUDE
// Formato esperado para cada questão:
// {
//   id: número único,
//   materia: "id_da_materia",
//   enunciado: "texto da pergunta",
//   alternativas: ["A) ...", "B) ...", "C) ...", "D) ..."],
//   gabarito: 0, 1, 2 ou 3 (índice da alternativa correta),
//   explicacao: "texto explicativo"
// }

const QUESTOES = [
  // ÉTICA PROFISSIONAL
  {
    id: 1,
    materia: "etica",
    enunciado: "O advogado que revelar, sem justa causa, sigilo profissional responderá com qual sanção disciplinar?",
    alternativas: ["A) Suspensão de 30 dias", "B) Exclusão", "C) Censura", "D) Multa de 5 anuidades"],
    gabarito: 2,
    explicacao: "Conforme o EOAB, a violação de sigilo profissional sem justa causa configura infração passível de censura."
  },
  {
    id: 2,
    materia: "etica",
    enunciado: "Qual é a natureza jurídica dos honorários advocatícios?",
    alternativas: ["A) Natureza comercial", "B) Natureza alimentar", "C) Natureza trabalhista", "D) Natureza administrativa"],
    gabarito: 1,
    explicacao: "Os honorários advocatícios têm natureza alimentar, conferindo-lhes proteção especial no ordenamento jurídico."
  },
  {
    id: 3,
    materia: "etica",
    enunciado: "Qual é o prazo de prescrição para ações disciplinares contra advogados?",
    alternativas: ["A) 2 anos", "B) 3 anos", "C) 5 anos", "D) 10 anos"],
    gabarito: 2,
    explicacao: "O prazo de prescrição disciplinar é de 5 anos contados da constatação oficial da infração."
  },
  {
    id: 4,
    materia: "etica",
    enunciado: "Em relação ao pacto quota litis, qual afirmação está correta?",
    alternativas: ["A) Pode superar as vantagens do cliente", "B) Deve ser em pecúnia e não superar as vantagens", "C) É permitido em qualquer circunstância", "D) Não precisa ser documentado"],
    gabarito: 1,
    explicacao: "O pacto quota litis deve ser em pecúnia e não pode superar as vantagens que o cliente obterá com a demanda."
  },
  {
    id: 5,
    materia: "etica",
    enunciado: "Qual é o privilégio de inviolabilidade do escritório de advocacia?",
    alternativas: ["A) Absoluto e sem exceções", "B) Pode ser quebrado com mandado genérico", "C) Quebrado com indícios de crime do advogado + mandado específico", "D) Não existe tal privilégio"],
    gabarito: 2,
    explicacao: "A inviolabilidade do escritório é quebrada apenas quando há indícios de crime do advogado e mandado específico."
  },
  {
    id: 6,
    materia: "etica",
    enunciado: "Qual é a progressão das sanções disciplinares no EOAB?",
    alternativas: ["A) Censura → Suspensão → Exclusão", "B) Suspensão → Censura → Exclusão", "C) Exclusão → Suspensão → Censura", "D) Multa → Censura → Exclusão"],
    gabarito: 0,
    explicacao: "A progressão das sanções disciplinares é: Censura → Suspensão (30 dias a 12 meses) → Exclusão."
  },
  {
    id: 7,
    materia: "etica",
    enunciado: "Qual é a exigência de quórum para a exclusão de um advogado?",
    alternativas: ["A) Maioria simples", "B) 2/3 do Conselho Seccional", "C) Unanimidade", "D) Maioria dos presentes"],
    gabarito: 1,
    explicacao: "A exclusão de um advogado exige votação de 2/3 dos membros do Conselho Seccional."
  },
  {
    id: 8,
    materia: "etica",
    enunciado: "Qual tipo de publicidade é permitida para advogados?",
    alternativas: ["A) Rádio, TV e outdoor", "B) Cartões, site, logomarca e colunas educativas", "C) Qualquer tipo de publicidade", "D) Nenhuma publicidade é permitida"],
    gabarito: 1,
    explicacao: "São permitidas: cartões, site, logomarca e colunas educativas. Proibidas: rádio, TV, outdoor."
  },

  // DIREITO TRIBUTÁRIO
  {
    id: 9,
    materia: "tributario",
    enunciado: "Qual é o princípio fundamental que rege a criação de tributos?",
    alternativas: ["A) Princípio da Igualdade", "B) Princípio da Legalidade", "C) Princípio da Proporcionalidade", "D) Princípio da Eficiência"],
    gabarito: 1,
    explicacao: "O Princípio da Legalidade exige que tributos sejam criados e extintos por lei."
  },
  {
    id: 10,
    materia: "tributario",
    enunciado: "Qual é a regra geral de anterioridade tributária?",
    alternativas: ["A) Anterioridade de 30 dias", "B) Anterioridade de 60 dias", "C) Anterioridade anual + nonagesimal (90 dias)", "D) Sem anterioridade"],
    gabarito: 2,
    explicacao: "A regra geral é anterioridade anual + nonagesimal (90 dias), com exceções para certos impostos."
  },
  {
    id: 11,
    materia: "tributario",
    enunciado: "A OAB possui qual tipo de imunidade tributária?",
    alternativas: ["A) Imunidade recíproca", "B) Imunidade de templos", "C) Imunidade cultural", "D) Imunidade geral"],
    gabarito: 0,
    explicacao: "A OAB possui imunidade recíproca como entidade de classe. A Caixa de Assistência não possui imunidade."
  },
  {
    id: 12,
    materia: "tributario",
    enunciado: "Qual é a competência tributária da União?",
    alternativas: ["A) ICMS, IPVA, ITCMD", "B) IPTU, ITBI, ISS", "C) IR, IPI, IOF, ITR, II, IE", "D) Todos os impostos"],
    gabarito: 2,
    explicacao: "A União tem competência para: IR, IPI, IOF, ITR, II, IE, CBS e Imposto Seletivo."
  },
  {
    id: 13,
    materia: "tributario",
    enunciado: "Qual é a natureza jurídica da competência tributária?",
    alternativas: ["A) Delegável e renunciável", "B) Indelegável, incaducável, inalterável, irrenunciável", "C) Delegável mas irrenunciável", "D) Renunciável mas indelegável"],
    gabarito: 1,
    explicacao: "A competência tributária é indelegável, incaducável, inalterável e irrenunciável."
  },
  {
    id: 14,
    materia: "tributario",
    enunciado: "Qual é o prazo de prescrição para o crédito tributário?",
    alternativas: ["A) 2 anos", "B) 3 anos", "C) 5 anos", "D) 10 anos"],
    gabarito: 2,
    explicacao: "O prazo de prescrição e decadência para crédito tributário é de 5 anos, conforme Lei Complementar."
  },
  {
    id: 15,
    materia: "tributario",
    enunciado: "O que é denúncia espontânea em matéria tributária?",
    alternativas: ["A) Sempre exclui responsabilidade", "B) Exclui responsabilidade se acompanhada de pagamento + juros", "C) Não exclui se houver fiscalização", "D) Não exclui responsabilidade"],
    gabarito: 1,
    explicacao: "Denúncia espontânea exclui responsabilidade apenas se acompanhada de pagamento + juros, e não após início de fiscalização."
  },
  {
    id: 16,
    materia: "tributario",
    enunciado: "Qual é a forma de suspensão do crédito tributário (MODIRECON)?",
    alternativas: ["A) Apenas moratória", "B) Moratória, Depósito integral, Reclamações/recursos, etc.", "C) Apenas depósito", "D) Nenhuma forma de suspensão"],
    gabarito: 1,
    explicacao: "MODIRECON: Moratória, Depósito integral, Reclamações/recursos, Concessão liminar MS, Tutela antecipada, Parcelamento."
  },

  // DIREITO PENAL
  {
    id: 17,
    materia: "penal",
    enunciado: "Qual é a diferença entre dolo direto e dolo eventual?",
    alternativas: ["A) Não há diferença", "B) Direto: quer o resultado; Eventual: assume o risco", "C) Eventual: quer o resultado; Direto: assume o risco", "D) Ambos são iguais"],
    gabarito: 1,
    explicacao: "Dolo direto: o agente quer o resultado. Dolo eventual: o agente assume o risco de produzi-lo."
  },
  {
    id: 18,
    materia: "penal",
    enunciado: "Qual é a pena reduzida na tentativa?",
    alternativas: ["A) 1/4 a 1/3 menor", "B) 1/3 a 2/3 menor", "C) 1/2 menor", "D) Sem redução"],
    gabarito: 1,
    explicacao: "Na tentativa, a pena é reduzida de 1/3 a 2/3 da pena do crime consumado."
  },
  {
    id: 19,
    materia: "penal",
    enunciado: "Qual é a prescrição para crime com pena máxima de 8 anos?",
    alternativas: ["A) 8 anos", "B) 10 anos", "C) 12 anos", "D) 16 anos"],
    gabarito: 2,
    explicacao: "Para crime com pena máxima entre 4 e 8 anos, o prazo de prescrição é de 12 anos."
  },
  {
    id: 20,
    materia: "penal",
    enunciado: "Qual é a pena para homicídio qualificado?",
    alternativas: ["A) 6-20 anos", "B) 8-24 anos", "C) 12-30 anos", "D) 15-30 anos"],
    gabarito: 2,
    explicacao: "Homicídio qualificado tem pena de 12 a 30 anos de reclusão."
  },
  {
    id: 21,
    materia: "penal",
    enunciado: "Qual é a pena para roubo?",
    alternativas: ["A) 1-4 anos", "B) 2-8 anos", "C) 4-10 anos", "D) 5-15 anos"],
    gabarito: 2,
    explicacao: "Roubo tem pena de 4 a 10 anos de reclusão."
  },
  {
    id: 22,
    materia: "penal",
    enunciado: "Qual é a pena para tráfico de drogas?",
    alternativas: ["A) 2-5 anos", "B) 3-10 anos", "C) 5-15 anos", "D) 10-20 anos"],
    gabarito: 2,
    explicacao: "Tráfico de drogas tem pena de 5 a 15 anos de reclusão."
  },
  {
    id: 23,
    materia: "penal",
    enunciado: "Qual é a pena para latrocínio (roubo seguido de morte)?",
    alternativas: ["A) 4-10 anos", "B) 12-30 anos", "C) 20-30 anos", "D) 25-40 anos"],
    gabarito: 2,
    explicacao: "Latrocínio tem pena de 20 a 30 anos de reclusão e é competência do juiz singular, não do júri."
  },
  {
    id: 24,
    materia: "penal",
    enunciado: "Qual é a pena para estelionato?",
    alternativas: ["A) 1-3 anos", "B) 1-5 anos", "C) 2-8 anos", "D) 3-10 anos"],
    gabarito: 1,
    explicacao: "Estelionato tem pena de 1 a 5 anos de reclusão."
  },

  // PROCESSO CIVIL
  {
    id: 25,
    materia: "processocivil",
    enunciado: "Qual é o prazo geral para interposição de apelação?",
    alternativas: ["A) 10 dias", "B) 15 dias úteis", "C) 20 dias", "D) 30 dias"],
    gabarito: 1,
    explicacao: "Apelação segue o prazo recursal geral de 15 dias úteis conforme CPC."
  },
  {
    id: 26,
    materia: "processocivil",
    enunciado: "Qual é a diferença entre litisconsórcio necessário e facultativo?",
    alternativas: ["A) Necessário é obrigatório por lei/natureza; Facultativo é opcional", "B) Ambos são obrigatórios", "C) Ambos são opcionais", "D) Não há diferença"],
    gabarito: 0,
    explicacao: "Litisconsórcio necessário é obrigatório por lei ou natureza; facultativo é opcional."
  },
  {
    id: 27,
    materia: "processocivil",
    enunciado: "O que é tutela de urgência?",
    alternativas: ["A) Apenas tutela antecipada", "B) Apenas tutela cautelar", "C) Fumus boni iuris + periculum in mora", "D) Medida sem requisitos"],
    gabarito: 2,
    explicacao: "Tutela de urgência exige fumus boni iuris (aparência de bom direito) + periculum in mora (perigo de dano)."
  },
  {
    id: 28,
    materia: "processocivil",
    enunciado: "Qual é a função do IRDR?",
    alternativas: ["A) Apenas recurso", "B) Incidente que suspende processos e forma tese vinculante", "C) Medida cautelar", "D) Ação originária"],
    gabarito: 1,
    explicacao: "IRDR (Incidente de Resolução de Demandas Repetitivas) suspende processos e forma tese vinculante."
  },
  {
    id: 29,
    materia: "processocivil",
    enunciado: "Qual é o prazo para embargos de declaração?",
    alternativas: ["A) 5 dias", "B) 10 dias", "C) 15 dias", "D) 30 dias"],
    gabarito: 1,
    explicacao: "Embargos de declaração têm prazo de 5 dias úteis para corrigir omissão, contradição ou obscuridade."
  },
  {
    id: 30,
    materia: "processocivil",
    enunciado: "Qual é o título executivo extrajudicial?",
    alternativas: ["A) Sentença", "B) Acórdão", "C) Contrato com cláusula executiva", "D) Apenas sentença e acórdão"],
    gabarito: 2,
    explicacao: "Título executivo extrajudicial inclui contrato com cláusula executiva, cheque, duplicata, etc."
  },
  {
    id: 31,
    materia: "processocivil",
    enunciado: "Qual é a ordem de penhora no processo civil?",
    alternativas: ["A) Qualquer ordem", "B) Ordem legal estabelecida no CPC", "C) Ordem escolhida pelo credor", "D) Sem ordem específica"],
    gabarito: 1,
    explicacao: "A penhora segue a ordem legal estabelecida no CPC, priorizando bens menos prejudiciais ao devedor."
  },
  {
    id: 32,
    materia: "processocivil",
    enunciado: "Qual é a diferença entre agravo de instrumento e agravo interno?",
    alternativas: ["A) Não há diferença", "B) Instrumento contra decisão interlocutória; Interno contra decisão monocrática", "C) Ambos são contra sentença", "D) Ambos são contra decisão interlocutória"],
    gabarito: 1,
    explicacao: "Agravo de instrumento é contra decisão interlocutória; agravo interno é contra decisão monocrática do relator."
  },

  // DIREITO CONSTITUCIONAL
  {
    id: 33,
    materia: "constitucional",
    enunciado: "Qual remédio constitucional é adequado para impedir a posse de um eleito quando há vício no processo eleitoral?",
    alternativas: ["A) Habeas corpus", "B) Mandado de segurança", "C) Mandado de injunção", "D) Habeas data"],
    gabarito: 1,
    explicacao: "Mandado de segurança protege direito líquido e certo lesado por ato de autoridade pública. Pode impedir a posse."
  },
  {
    id: 34,
    materia: "constitucional",
    enunciado: "O direito fundamental à vida é considerado cláusula pétrea?",
    alternativas: ["A) Não, pode ser alterado", "B) Sim, não pode ser abolido nem por emenda constitucional", "C) Apenas em caso de guerra", "D) Apenas para maiores de 18 anos"],
    gabarito: 1,
    explicacao: "Direitos fundamentais (vida, liberdade, igualdade) são cláusulas pétreas. Não podem ser abolidas por emenda (art. 60, §4°, CF)."
  },
  {
    id: 35,
    materia: "constitucional",
    enunciado: "Qual é a competência originária do STF segundo a Constituição?",
    alternativas: ["A) Julgar apenas crimes do presidente", "B) ADI, ADC, ADPF, mandado de segurança contra atos do STF", "C) Recursos ordinários", "D) Ações contra pessoas comuns"],
    gabarito: 1,
    explicacao: "STF tem competência originária para ADI, ADC, ADPF, mandado de segurança e ações contra altas autoridades (art. 102, CF)."
  },
  {
    id: 36,
    materia: "constitucional",
    enunciado: "Quem pode ajuizar ação direta de inconstitucionalidade (ADI)?",
    alternativas: ["A) Apenas o presidente", "B) Presidente, governador, procurador-geral da República, OAB, partido político, confederação sindical", "C) Apenas qualquer cidadão", "D) Ninguém pode ajuizar ADI"],
    gabarito: 1,
    explicacao: "Legitimados ativos da ADI: presidente, governador, PGR, OAB, partido com representação, confederação sindical, entidades de classe (art. 103, CF)."
  },
  {
    id: 37,
    materia: "constitucional",
    enunciado: "A suspensão de direitos políticos é permitida em que casos?",
    alternativas: ["A) Nunca é permitida", "B) Cancelamento de naturalização, condenação por crime político, sentença condenatória com pena privativa", "C) Em caso de multa", "D) Por decreto presidencial"],
    gabarito: 1,
    explicacao: "Direitos políticos podem ser suspensos por cancelamento de naturalização, condenação por crime político ou crime comum com pena (art. 15, CF)."
  },
  {
    id: 38,
    materia: "constitucional",
    enunciado: "O voto é obrigatório no Brasil?",
    alternativas: ["A) Nunca", "B) Apenas para maiores de 60 anos", "C) Sim, para maiores de 18 até 65 anos", "D) Apenas em eleições presidenciais"],
    gabarito: 2,
    explicacao: "Voto obrigatório para maiores de 18 e menores de 65 anos. Maiores de 70 anos é facultativo (art. 14, §1°, CF)."
  },
  {
    id: 39,
    materia: "constitucional",
    enunciado: "Qual é o quórum para aprovação de emenda constitucional?",
    alternativas: ["A) Maioria simples", "B) Maioria absoluta", "C) Maioria dos 3/5 em dois turnos nas duas casas", "D) Unanimidade"],
    gabarito: 2,
    explicacao: "Emenda constitucional requer votação em dois turnos, com aprovação de 3/5 de cada casa (Câmara + Senado) (art. 60, §2°, CF)."
  },
  {
    id: 40,
    materia: "constitucional",
    enunciado: "Pode ser objeto de decisão vinculante do STF em ADI?",
    alternativas: ["A) Interpretação de lei", "B) Não, ADI não pode gerar decisão vinculante", "C) Interpretação conforme a Constituição ou declaração de inconstitucionalidade", "D) Apenas multas"],
    gabarito: 2,
    explicacao: "ADI pode gerar interpretação conforme a Constituição (vinculante) ou declaração de inconstitucionalidade (efeitos erga omnes)."
  },

  // PROCESSO PENAL
  {
    id: 41,
    materia: "processpenal",
    enunciado: "Qual é o prazo máximo de duração de uma prisão em flagrante?",
    alternativas: ["A) 12 horas", "B) 24 horas", "C) 48 horas", "D) 72 horas"],
    gabarito: 2,
    explicacao: "Prisão em flagrante não pode ultrapassar 24 horas sem conversão em preventiva. Em caso de preso comunicado, até 48h (art. 306, CPP)."
  },
  {
    id: 42,
    materia: "processpenal",
    enunciado: "Qual é a competência para julgar crime cometido por vice-presidente?",
    alternativas: ["A) Juiz de primeira instância", "B) Tribunal de Justiça", "C) STJ", "D) STF"],
    gabarito: 3,
    explicacao: "STF tem competência originária para processar e julgar o vice-presidente por crime comum (art. 102, I, b, CF)."
  },
  {
    id: 43,
    materia: "processpenal",
    enunciado: "O que é denúncia no processo penal?",
    alternativas: ["A) Acusação feita pela vítima", "B) Acusação do Ministério Público em crime de ação pública", "C) Defesa do réu", "D) Pronunciamento do juiz"],
    gabarito: 1,
    explicacao: "Denúncia é a acusação formal do Ministério Público em crime de ação pública (art. 24, CPP)."
  },
  {
    id: 44,
    materia: "processpenal",
    enunciado: "Qual é o direito do acusado de ter advogado desde o primeiro momento de contato com polícia?",
    alternativas: ["A) Direito geral, sem exceções", "B) Direito apenas em interrogatório judicial", "C) Não existe esse direito", "D) Apenas para crimes graves"],
    gabarito: 0,
    explicacao: "Direito fundamental do acusado ter advogado desde o primeiro ato de investigação, não podendo ser interrogado sem defesa técnica."
  },
  {
    id: 45,
    materia: "processpenal",
    enunciado: "O que é arquivamento do inquérito policial?",
    alternativas: ["A) Destruição de documentos", "B) Decisão de não denunciar, encerramento da investigação", "C) Afastamento do réu", "D) Adiamento do julgamento"],
    gabarito: 1,
    explicacao: "Arquivamento é a decisão (via juiz de direito) de não prosseguir na ação penal por falta de provas ou motivo legal (art. 28, CPP)."
  },
  {
    id: 46,
    materia: "processpenal",
    enunciado: "Qual é a duração do inquérito policial em crime comum?",
    alternativas: ["A) 10 dias", "B) 30 dias, prorrogável por igual período", "C) 60 dias", "D) 90 dias"],
    gabarito: 1,
    explicacao: "Prazo geral do inquérito policial é 10 dias (crime simples) ou 20 dias (crime complexo), prorrogável uma vez (art. 10, CPP)."
  },
  {
    id: 47,
    materia: "processpenal",
    enunciado: "O confesso pode ser condenado sem outras provas?",
    alternativas: ["A) Nunca", "B) Sempre", "C) Confissão é elemento importante, mas não exclui necessidade de outras provas", "D) Apenas em crimes contra patrimônio"],
    gabarito: 2,
    explicacao: "Confissão é prova, mas sofre avaliação judicial. Juiz não fica obrigado a aceitar confessor sem análise de outras circunstâncias."
  },
  {
    id: 48,
    materia: "processpenal",
    enunciado: "Qual é o significado de 'in dubio pro reo'?",
    alternativas: ["A) Dúvida favorece a acusação", "B) Dúvida favorece o réu", "C) Não há dúvida", "D) Dúvida anula o julgamento"],
    gabarito: 1,
    explicacao: "'In dubio pro reo' é princípio fundamental: na dúvida, favorece-se o acusado. Presunção de inocência (art. 5°, LVII, CF)."
  },

  // DIREITO CIVIL
  {
    id: 49,
    materia: "civil",
    enunciado: "Qual é a idade mínima para contratar casamento no Brasil?",
    alternativas: ["A) 16 anos", "B) 18 anos", "C) 21 anos", "D) 14 anos"],
    gabarito: 0,
    explicacao: "Idade mínima é 18 anos. Excepcionalmente, a partir de 16 anos com autorização dos pais/responsável (art. 1517, CC)."
  },
  {
    id: 50,
    materia: "civil",
    enunciado: "Qual é o regime de bens padrão no casamento brasileiro?",
    alternativas: ["A) Comunhão universal", "B) Comunhão parcial", "C) Separação absoluta", "D) Dotal"],
    gabarito: 1,
    explicacao: "Comunhão parcial de bens é o regime legal padrão. Benditas posteriores ao casamento entram em comunhão (art. 1658, CC)."
  },
  {
    id: 51,
    materia: "civil",
    enunciado: "Quanto tempo leva para uma separação ser considerada consumada?",
    alternativas: ["A) 6 meses", "B) 1 ano", "C) 2 anos", "D) Pode ser imediata"],
    gabarito: 3,
    explicacao: "Separação consensual pode ser imediata (cartório). Contenciosa: 1 ano de separação de fato antes da sentença (art. 1574, CC)."
  },
  {
    id: 52,
    materia: "civil",
    enunciado: "Qual é o prazo de prescrição para ação de cobrança de dívida?",
    alternativas: ["A) 1 ano", "B) 3 anos", "C) 5 anos", "D) 10 anos"],
    gabarito: 2,
    explicacao: "Prescrição geral é 5 anos, reduzida em 2 anos para comerciantes (art. 205, 208, CC)."
  },
  {
    id: 53,
    materia: "civil",
    enunciado: "O que é responsabilidade civil objetiva?",
    alternativas: ["A) Responsabilidade por culpa comprovada", "B) Responsabilidade pelo risco criado, independente de culpa", "C) Sem responsabilidade", "D) Responsabilidade apenas do empregado"],
    gabarito: 1,
    explicacao: "Responsabilidade objetiva dispensa prova de culpa. Ex.: atividade perigosa, dano ambiental, consumidor (art. 927, CC)."
  },
  {
    id: 54,
    materia: "civil",
    enunciado: "Qual é a diferença entre venda e troca?",
    alternativas: ["A) São iguais", "B) Venda é por preço em dinheiro; troca é por outro bem", "C) Não há diferença legal", "D) Troca não é contrato válido"],
    gabarito: 1,
    explicacao: "Venda tem contrapartida em dinheiro; troca é permuta de bens. Regras distintas em prescrição (art. 481, CC vs art. 533)."
  },
  {
    id: 55,
    materia: "civil",
    enunciado: "O que é venda a termo no direito civil?",
    alternativas: ["A) Venda com prazo para pagamento", "B) Venda imediata à vista", "C) Venda com condição suspensiva", "D) Venda rescindida"],
    gabarito: 0,
    explicacao: "Venda a termo permite pagamento futuro. Transferência de propriedade ocorre no momento do contrato (art. 490, CC)."
  },
  {
    id: 56,
    materia: "civil",
    enunciado: "Qual é o prazo de prescrição para ação de paternidade?",
    alternativas: ["A) Nunca prescreve", "B) 5 anos", "C) 10 anos", "D) 20 anos"],
    gabarito: 0,
    explicacao: "Ação de paternidade não prescreve. Pode ser proposta a qualquer tempo (art. 1614, CC)."
  },

  // DIREITO DO TRABALHO
  {
    id: 57,
    materia: "trabalho",
    enunciado: "Qual é a duração máxima da jornada de trabalho no Brasil?",
    alternativas: ["A) 6 horas", "B) 8 horas", "C) 10 horas", "D) 12 horas"],
    gabarito: 1,
    explicacao: "Jornada diária máxima é 8 horas (art. 7°, XIII, CF). Pode ser estendida com acordo/dissídio."
  },
  {
    id: 58,
    materia: "trabalho",
    enunciado: "O trabalho infantil é permitido no Brasil?",
    alternativas: ["A) Sim, em qualquer idade", "B) Sim, menores de 18 com autorização", "C) Não, é proibido menores de 16 (exceto aprendiz a partir de 14)", "D) Depende do tipo de trabalho"],
    gabarito: 2,
    explicacao: "Trabalho proibido para menores de 16 anos. Exceção: aprendizagem a partir de 14 (art. 7°, XXXIII, CF)."
  },
  {
    id: 59,
    materia: "trabalho",
    enunciado: "Qual é o aviso prévio mínimo em rescisão de contrato?",
    alternativas: ["A) 7 dias", "B) 14 dias", "C) 30 dias", "D) 60 dias"],
    gabarito: 2,
    explicacao: "Aviso prévio mínimo é 30 dias (art. 7°, XXI, CF). Pode ser estendido por dissídio ou acordo."
  },
  {
    id: 60,
    materia: "trabalho",
    enunciado: "Empregado demitido sem justa causa tem direito a qual indenização?",
    alternativas: ["A) Nenhuma", "B) 1 mês de salário", "C) Indenização por danos morais", "D) 40% do FGTS + aviso prévio + seguro desemprego"],
    gabarito: 3,
    explicacao: "Demissão sem justa causa: aviso prévio, FGTS (com 40% indenizatório), seguro desemprego, 13º, férias (art. 477, CLT)."
  },
  {
    id: 61,
    materia: "trabalho",
    enunciado: "Qual é o valor da multa por atraso de salário?",
    alternativas: ["A) Sem multa", "B) 5% do salário", "C) 10% do salário", "D) Não há limite fixo, juros de mora + correção monetária"],
    gabarito: 3,
    explicacao: "Salário atrasado sofre juros de mora (1% ao mês) + correção monetária, sem limite máximo (jurisprudência)."
  },
  {
    id: 62,
    materia: "trabalho",
    enunciado: "O trabalho aos domingos é proibido?",
    alternativas: ["A) Sempre proibido", "B) Permitido com pagamento em dobro", "C) Permitido em qualquer atividade", "D) Proibido apenas para menores"],
    gabarito: 1,
    explicacao: "Trabalho no domingo é permitido, mas com repouso compensatório e/ou adicional de 100% (art. 7°, XV, CF)."
  },
  {
    id: 63,
    materia: "trabalho",
    enunciado: "Qual é a estabilidade de um representante da comissão de trabalhadores?",
    alternativas: ["A) Nenhuma", "B) Até 12 meses após deixar a comissão", "C) Até 5 anos", "D) Vitalícia"],
    gabarito: 1,
    explicacao: "Representante de comissão tem proteção contra dispensa imotivada até 12 meses após deixar a comissão (art. 27, Lei 11.786)."
  },
  {
    id: 64,
    materia: "trabalho",
    enunciado: "Qual é a duração máxima de contrato de trabalho a termo?",
    alternativas: ["A) 6 meses", "B) 1 ano", "C) 2 anos", "D) 5 anos"],
    gabarito: 2,
    explicacao: "Contrato a termo tem duração máxima de 2 anos, com prorrogação uma vez por igual período (art. 445, CLT)."
  },

  // DIREITO ADMINISTRATIVO
  {
    id: 65,
    materia: "administrativo",
    enunciado: "O que é ato administrativo?",
    alternativas: ["A) Qualquer ato da administração", "B) Manifestação de vontade que visa criar, modificar ou extinguir situações jurídicas", "C) Apenas decisões judiciais", "D) Ato sem efeito legal"],
    gabarito: 1,
    explicacao: "Ato administrativo é manifestação de vontade da Adm. Pública que visa produzir efeitos jurídicos (criar, modificar, extinguir direitos)."
  },
  {
    id: 66,
    materia: "administrativo",
    enunciado: "Qual é o prazo de prescrição para ação popular contra ato administrativo lesivo?",
    alternativas: ["A) 6 meses", "B) 1 ano", "C) 5 anos", "D) Nunca prescreve"],
    gabarito: 2,
    explicacao: "Ação popular prescreve em 5 anos (art. 26, Lei 4.717/65)."
  },
  {
    id: 67,
    materia: "administrativo",
    enunciado: "Qual é o princípio que proíbe a administração de alterar unilateralmente contrato?",
    alternativas: ["A) Legalidade", "B) Moralidade", "C) Equilíbrio econômico-financeiro", "D) Impessoalidade"],
    gabarito: 2,
    explicacao: "Contrato administrativo pode ser modificado unilateralmente em situações extraordinárias, mas mantendo equilíbrio econômico (cláusula rebus sic stantibus)."
  },
  {
    id: 68,
    materia: "administrativo",
    enunciado: "O que é licitação pública?",
    alternativas: ["A) Dispensa de concorrência", "B) Processo competitivo para contratação de obras, serviços e compras", "C) Ato arbitrário", "D) Contratação direta"],
    gabarito: 1,
    explicacao: "Licitação é processo competitivo obrigatório para Adm. Pública contratar (Lei 8.666/93). Modalidades: concorrência, tomada de preço, convite."
  },
  {
    id: 69,
    materia: "administrativo",
    enunciado: "Qual é a extensão da responsabilidade civil da administração pública?",
    alternativas: ["A) Sem responsabilidade", "B) Responsabilidade objetiva pelos danos causados por agentes", "C) Apenas responsabilidade subjetiva", "D) Responsabilidade limitada ao agente"],
    gabarito: 1,
    explicacao: "Adm. Pública tem responsabilidade objetiva por danos causados por servidores (art. 37, §6°, CF). Direito de regresso contra o agente."
  },
  {
    id: 70,
    materia: "administrativo",
    enunciado: "O que é poder discricionário?",
    alternativas: ["A) Poder arbitrário sem limites", "B) Poder da Adm. de escolher a melhor forma de agir dentro da lei", "C) Poder exclusivo do judiciário", "D) Poder sem controle"],
    gabarito: 1,
    explicacao: "Poder discricionário: Adm. escolhe a forma, tempo, modo de agir, mas sempre dentro da lei (art. 2°, Lei 4.717)."
  },
  {
    id: 71,
    materia: "administrativo",
    enunciado: "Qual é a duração do mandato de diretor de autarquia?",
    alternativas: ["A) 1 ano", "B) 2 anos", "C) 4 anos", "D) 6 anos"],
    gabarito: 2,
    explicacao: "Diretor de autarquia federal tem mandato de 4 anos, podendo ser reconduzido (art. 12, Lei 8.112)."
  },
  {
    id: 72,
    materia: "administrativo",
    enunciado: "O que é direito adquirido na administração pública?",
    alternativas: ["A) Direito de servidor não ser removido", "B) Direito já incorporado ao patrimônio jurídico, protegido contra leis futuras", "C) Direito de qualquer pessoa", "D) Sem proteção"],
    gabarito: 1,
    explicacao: "Direito adquirido é aquele já incorporado ao patrimônio jurídico, protegido por lei transitória (art. 5°, XXXVI, CF)."
  },

  // DIREITO DO CONSUMIDOR
  {
    id: 73,
    materia: "consumidor",
    enunciado: "Qual é o prazo para reclamação de vício aparente em produto?",
    alternativas: ["A) 7 dias", "B) 14 dias", "C) 30 dias", "D) 90 dias"],
    gabarito: 2,
    explicacao: "Vício aparente: 30 dias se duráveis; 90 dias se duráveis (art. 26, CDC). Contagem: entrega do produto."
  },
  {
    id: 74,
    materia: "consumidor",
    enunciado: "Qual é a responsabilidade do fornecedor por vício do produto?",
    alternativas: ["A) Sem responsabilidade", "B) Responsabilidade apenas se culpado", "C) Responsabilidade objetiva", "D) Responsabilidade limitada"],
    gabarito: 2,
    explicacao: "Fornecedor tem responsabilidade objetiva por vício (art. 18, CDC). Consumidor pode escolher: reparo, substituição, devolução do dinheiro."
  },
  {
    id: 75,
    materia: "consumidor",
    enunciado: "O que é publicidade enganosa no CDC?",
    alternativas: ["A) Qualquer publicidade", "B) Publicidade que induz a erro sobre características do produto", "C) Publicidade cara", "D) Publicidade com oferta"],
    gabarito: 1,
    explicacao: "Publicidade enganosa: não revela informações essenciais ou induz a erro sobre produto/serviço (art. 37, CDC)."
  },
  {
    id: 76,
    materia: "consumidor",
    enunciado: "Qual é o prazo mínimo de garantia legal em bem durável?",
    alternativas: ["A) 15 dias", "B) 30 dias", "C) 90 dias", "D) 1 ano"],
    gabarito: 3,
    explicacao: "Garantia legal mínima é 12 meses (1 ano) para bem durável (art. 26, §1°, CDC)."
  },
  {
    id: 77,
    materia: "consumidor",
    enunciado: "Qual é a responsabilidade do fornecedor por acidente causado por produto?",
    alternativas: ["A) Sem responsabilidade", "B) Responsabilidade compartilhada", "C) Responsabilidade objetiva por danos corporais", "D) Responsabilidade apenas se doloso"],
    gabarito: 2,
    explicacao: "Fornecedor tem responsabilidade objetiva por danos corporais causados por produto (art. 12, CDC). Direito de regresso contra culpado."
  },
  {
    id: 78,
    materia: "consumidor",
    enunciado: "O que é direito de arrependimento no CDC?",
    alternativas: ["A) Direito de se arrepender e ficar com o produto", "B) Direito de devolver produto em 7 dias em contrato à distância (sem ônus)", "C) Direito apenas do lojista", "D) Sem direito de devolução"],
    gabarito: 1,
    explicacao: "Direito de arrependimento: consumidor pode devolver em 7 dias se contrato à distância, sem ônus (art. 49, CDC)."
  },
  {
    id: 79,
    materia: "consumidor",
    enunciado: "Qual é a prescrição para ação por vício aparente?",
    alternativas: ["A) 6 meses", "B) 1 ano", "C) 2 anos", "D) 5 anos"],
    gabarito: 1,
    explicacao: "Prescrição da ação de responsabilidade: 5 anos (produto durável); 3 meses (não durável), contados da ciência do dano (art. 27, CDC)."
  },
  {
    id: 80,
    materia: "consumidor",
    enunciado: "É permitida cláusula de exclusão de responsabilidade do fornecedor?",
    alternativas: ["A) Sempre permitida", "B) Nunca permitida", "C) Permitida em alguns casos", "D) Apenas por consentimento escrito"],
    gabarito: 1,
    explicacao: "Cláusula que exclua/limite responsabilidade por dano causado a pessoa é nula (art. 25, CDC)."
  },

  // DIREITO EMPRESARIAL
  {
    id: 81,
    materia: "empresarial",
    enunciado: "Qual é a diferença entre sociedade de responsabilidade limitada e anônima?",
    alternativas: ["A) Não há diferença", "B) Limitada: sócios responsáveis até contribuição; Anônima: sócios limitados ao capital", "C) Limitada tem presidente", "D) Anônima não pode ter accionistas"],
    gabarito: 1,
    explicacao: "Limitada: responsabilidade limitada ao capital investido. Anônima: capital dividido em ações, responsabilidade limitada."
  },
  {
    id: 82,
    materia: "empresarial",
    enunciado: "Qual é o capital mínimo para constituir sociedade anônima?",
    alternativas: ["A) Não há limite", "B) R$ 10 mil", "C) R$ 100 mil", "D) Não há limite legal (depende de estatuto)"],
    gabarito: 3,
    explicacao: "Lei 6.404/76 não estabelece capital mínimo obrigatório. Pode ser definido no estatuto."
  },
  {
    id: 83,
    materia: "empresarial",
    enunciado: "O que é direito de voto nas sociedades por ações?",
    alternativas: ["A) Cada sócio tem 1 voto", "B) Um voto por ação ordinária", "C) Sócios preferentes têm direito de voto", "D) Ninguém tem direito de voto"],
    gabarito: 1,
    explicacao: "Ações ordinárias conferem direito de voto. Preferenciais geralmente não têm voto (Lei 6.404, art. 15)."
  },
  {
    id: 84,
    materia: "empresarial",
    enunciado: "Qual é a responsabilidade de administrador por débito da empresa?",
    alternativas: ["A) Responsável por tudo", "B) Responsabilidade pessoal e ilimitada por culpa/negligência", "C) Sem responsabilidade", "D) Responsabilidade limitada ao salário"],
    gabarito: 1,
    explicacao: "Administrador tem responsabilidade solidária por débitos se agir com culpa (art. 158, Lei 6.404)."
  },
  {
    id: 85,
    materia: "empresarial",
    enunciado: "O que é fusão de empresas?",
    alternativas: ["A) Separação de empresa", "B) União de duas ou mais empresas em uma, com transmissão de patrimônio", "C) Compra de ações", "D) Fechamento de empresa"],
    gabarito: 1,
    explicacao: "Fusão: extinção de empresa(s) com transferência de patrimônio para outra. Sociedade resultante assume ativos e passivos."
  },
  {
    id: 86,
    materia: "empresarial",
    enunciado: "Qual é a duração máxima de uma assembleia geral?",
    alternativas: ["A) 2 horas", "B) 4 horas", "C) 8 horas", "D) Sem limite legal"],
    gabarito: 3,
    explicacao: "Lei 6.404 não estabelece limite máximo de duração. Regimento interno pode fixar (art. 125)."
  },
  {
    id: 87,
    materia: "empresarial",
    enunciado: "O que é insider trading?",
    alternativas: ["A) Negociação comum de ações", "B) Uso de informação privilegiada para lucrar no mercado (proibido)", "C) Venda de empresa", "D) Empréstimo entre sócios"],
    gabarito: 1,
    explicacao: "Insider trading é ilegal. Vedado usar informação privilegiada para lucrar na bolsa (Lei 6.385, art. 27-D)."
  },
  {
    id: 88,
    materia: "empresarial",
    enunciado: "Qual é o prazo de prescrição para ação de resgate de ações?",
    alternativas: ["A) 1 ano", "B) 2 anos", "C) 3 anos", "D) 5 anos"],
    gabarito: 3,
    explicacao: "Prazo de prescrição para ação de resgate: 3 anos da data em que deixou de ser acionista (Lei 6.404)."
  },

  // DIREITOS HUMANOS
  {
    id: 89,
    materia: "humanosintl",
    enunciado: "Qual é o direito fundamental de liberdade de pensamento e expressão?",
    alternativas: ["A) Direito irrestrito", "B) Direito com responsabilidades e limites", "C) Sem direito de expressão", "D) Direito apenas para maiores"],
    gabarito: 1,
    explicacao: "Liberdade de expressão é fundamental (art. 5°, IX, CF; art. 19, DIDH), com responsabilidades civis/penais por abuso."
  },
  {
    id: 90,
    materia: "humanosintl",
    enunciado: "É permitida tortura no Brasil?",
    alternativas: ["A) Em caso de crime grave", "B) Nunca, é proibida absolutamente e considerada crime", "C) Em interrogatório", "D) Por autoridade policial"],
    gabarito: 1,
    explicacao: "Tortura é proibida absolutamente (art. 5°, III, CF). É crime inafiançável (Lei 9.455/97)."
  },
  {
    id: 91,
    materia: "humanosintl",
    enunciado: "Qual é o direito de acesso à justiça?",
    alternativas: ["A) Apenas para ricos", "B) Direito fundamental de acesso irrestrito, com assistência judiciária para pobres", "C) Não há direito de acesso", "D) Apenas para brasileiros"],
    gabarito: 1,
    explicacao: "Acesso à justiça é direito fundamental. Estado fornece assistência judiciária gratuita para quem não puder pagar (art. 5°, XXXV, LXXIV, CF)."
  },
  {
    id: 92,
    materia: "humanosintl",
    enunciado: "Qual é a proibição de escravidão no Brasil?",
    alternativas: ["A) Proibição apenas para estrangeiros", "B) Proibição absoluta e perpétua", "C) Permitida em contexto específico", "D) Sem proibição"],
    gabarito: 1,
    explicacao: "Escravidão proibida absolutamente no Brasil (Constituição de 1888, Lei Áurea; art. 5°, I, CF)."
  },
  {
    id: 93,
    materia: "humanosintl",
    enunciado: "Qual é o direito de liberdade religiosa?",
    alternativas: ["A) Apenas religião oficial", "B) Liberdade plena de crença e culto, com responsabilidade por abuso", "C) Sem direito de religião", "D) Apenas religiões do Estado"],
    gabarito: 1,
    explicacao: "Liberdade de religião é direito fundamental (art. 5°, VI, CF). Ninguém será privado de direitos por crença (art. 5°, VIII)."
  },
  {
    id: 94,
    materia: "humanosintl",
    enunciado: "Qual é o direito de proteção à maternidade e infância?",
    alternativas: ["A) Sem proteção", "B) Proteção especial e assistência estatal obrigatória", "C) Proteção apenas em doentes", "D) Proteção limitada"],
    gabarito: 1,
    explicacao: "Maternidade e infância têm proteção especial (art. 6°, CF; Convenção de Belém do Pará). Estado assegura saúde, educação, assistência."
  },
  {
    id: 95,
    materia: "humanosintl",
    enunciado: "Qual é a proibição de discriminação no Brasil?",
    alternativas: ["A) Sem proibição", "B) Proibição de discriminação por raça, cor, etnia, origem, gênero (crime inafiançável)", "C) Proibição apenas em contratos", "D) Discriminação permitida"],
    gabarito: 1,
    explicacao: "Discriminação por raça, cor, etnia, religião, origem é crime inafiançável (Lei 7.716/89). Proibida em Constituição (art. 3°, IV)."
  },
  {
    id: 96,
    materia: "humanosintl",
    enunciado: "Qual é o direito de asilo político?",
    alternativas: ["A) Sem direito", "B) Direito a refúgio quando perseguido por opinião política ou religião", "C) Asilo apenas para ricos", "D) Negado por decreto"],
    gabarito: 1,
    explicacao: "Asilo político é direito garantido (art. 4°, X, CF). Brasil signatário do Protocolo Sobre Refúgio (1951)."
  }
];

// Exportar para uso no script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MATERIAS, FLASHCARDS, QUESTOES };
}

// Exportar para uso no script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MATERIAS, FLASHCARDS, QUESTOES };
}
