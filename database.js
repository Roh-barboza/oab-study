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
  }
];

// Exportar para uso no script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MATERIAS, FLASHCARDS, QUESTOES };
}
