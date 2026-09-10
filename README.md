# OAB Study

Projeto complementar de preparação para a 1ª fase da OAB.

## Arquitetura oficial

- **ChatGPT**: interface principal de estudo, explicações, questões, correções e acompanhamento.
- **Google Drive**: biblioteca canônica de apostilas, mapas mentais e materiais.
- **Google Sheets**: fonte canônica do progresso, trilha, histórico, erros, revisões e desempenho.
- **Google Calendar**: rotina e lembretes.
- **Vercel**: apoio web opcional. Não é a fonte oficial do progresso acadêmico.

## Papel deste repositório

Este repositório mantém a aplicação web complementar de leitura e prática ativa e a documentação técnica mínima necessária para o deploy.

Estrutura principal:

- `index.html` — biblioteca, leitor, prova fundamentada, diagnóstico e revisões locais.
- `api/generate-quiz.js` — gera questões e valida a citação literal do material estudado.
- `database.js` — banco legado usado pelo site atual; não é fonte jurídica canônica e não substitui os materiais do Google Drive.
- `.gitignore` — proteção contra versionamento acidental de segredos e arquivos locais.
- `docs/SECURITY_AUDIT_2026-09-07.md` — registro da limpeza de segurança.

## Conteúdo acadêmico

Não usar este repositório para manter cópias paralelas das apostilas nem para gerar conteúdo jurídico desvinculado do material escolhido. O gerador deve usar exclusivamente o texto enviado na sessão e rejeitar questões sem citação literal de comprovação.

Os materiais oficiais de estudo permanecem no Google Drive. Alterações legislativas e jurisprudenciais devem ser verificadas em fontes oficiais durante as sessões de estudo no ChatGPT.

## Progresso

Qualquer contador exibido pelo site deve ser tratado apenas como estado local da sessão. O histórico oficial do estudante está no Google Sheets.

## Deploy

O projeto Vercel existente é `oab-study`. Não criar um segundo projeto sem necessidade técnica documentada.

## Segurança

Nunca versionar tokens, senhas, API keys, `.env` ou credenciais. O antigo fluxo Evolution API/Cloudfy foi aposentado e não faz parte da arquitetura OAB.
