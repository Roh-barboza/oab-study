# OAB Study

Plataforma web complementar do projeto de preparação para a 1ª fase da OAB.

## Papel do site

O site serve como apoio visual e ambiente local de questões. O progresso acadêmico oficial não é armazenado aqui.

A fonte canônica do progresso é a Central de Estudos no Google Sheets, conduzida e atualizada pelo ChatGPT durante as sessões de estudo.

## Importante sobre os contadores

Os números exibidos no site, como acertos, erros, taxa e avanço dentro de um módulo, representam apenas a sessão atual no navegador. Eles começam em zero e não devem ser interpretados como o histórico oficial da estudante.

## Estrutura atual

- `index.html` — aplicação web estática, com CSS e JavaScript inline
- `database.js` — banco legado de questões/conteúdo de demonstração; não é fonte jurídica canônica
- `README.md`
- `docs/SECURITY_AUDIT_2026-09-07.md`

Arquivos financeiros que estavam misturados neste repositório foram removidos do estado atual da branch de segurança.

## Segurança

Nunca versionar chaves de API, tokens, senhas ou arquivos `.env`.

Consulte `docs/SECURITY_AUDIT_2026-09-07.md` para o estado da auditoria e as ações manuais ainda necessárias.

## Deploy

O projeto existente `oab-study` na Vercel deve ser preservado. Não criar um segundo projeto apenas para esta limpeza.
