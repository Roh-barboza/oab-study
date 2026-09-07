# Auditoria de segurança — encerramento em 07/09/2026

## Estado final

O repositório público `Roh-barboza/oab-study` foi simplificado para o escopo OAB.

A árvore atual não contém os arquivos financeiros que haviam sido misturados ao projeto, nem o fluxo antigo que expunha credencial da Evolution API/Cloudfy.

O usuário confirmou que não utilizará mais Evolution API/Cloudfy neste projeto. Portanto, nenhuma nova credencial deve ser criada ou integrada ao OAB Study.

## Limpeza executada

- removidos os quatro artefatos do projeto financeiro da árvore atual;
- removidos `script.js` e `style.css` legados não usados pelo `index.html` atual;
- removidos guia de automação n8n, processador local de PDF, notas de fluxo de PDFs e plano legado Manus/Claude/SaaS;
- adicionado `.gitignore` para segredos, ambientes e artefatos locais;
- README alinhado à arquitetura final ChatGPT + Google;
- `database.js` e `index.html` preservados para manter o site complementar funcionando;
- histórico ativo da `main` reescrito para partir do último commit OAB anterior à introdução do projeto financeiro;
- branches técnicas conhecidas foram alinhadas à história limpa para não manterem a linha contaminada ativa.

## Arquitetura vigente

- ChatGPT: interface principal de estudo.
- Google Drive: fonte canônica dos materiais.
- Google Sheets: fonte canônica do progresso acadêmico.
- Google Calendar: rotina e lembretes.
- Vercel: apoio web opcional.

## Observação sobre o segredo antigo

A história ativa das branches foi saneada, mas plataformas Git podem manter objetos antigos temporariamente em caches, referências internas de pull requests, forks ou acessos diretos por SHA. A única forma de garantir que uma credencial histórica deixe de funcionar é desativá-la no provedor original.

Como Evolution API/Cloudfy foi aposentada pelo usuário, o passo externo recomendado é excluir/desativar a instância ou chave antiga no próprio provedor, caso a conta ainda exista. Não há integração disponível neste ambiente para executar essa ação externamente.

## Regra futura

Não adicionar n8n, Evolution API, banco financeiro, geração automática de conteúdo jurídico ou uma segunda IA professora sem uma nova decisão arquitetural explícita.
