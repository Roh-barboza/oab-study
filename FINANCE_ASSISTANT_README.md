# 💰 Assistente Financeiro Inteligente (n8n + WhatsApp)

Este projeto é um assistente financeiro automatizado que utiliza **n8n**, **PostgreSQL** e **Evolution API (WhatsApp)** para monitorar gastos diários, gerenciar entradas e fornecer insights estratégicos para economia.

## 🚀 Funcionalidades
- **Registro por Voz/Texto**: Envie "Gastei 50 com almoço" e o bot registra automaticamente.
- **Gestão de Saldo**: Acompanhamento em tempo real do saldo mensal vs. déficit.
- **Meta Diária**: Cálculo automático de quanto você pode gastar por dia para atingir seus objetivos.
- **Inteligência Estratégica**: Identificação de gastos supérfluos (foco atual: redução da fatura Nubank).

## 🛠️ Tecnologias e Acessos
- **Automação**: [n8n](https://chaoticcow-n8n.cloudfy.live/)
- **Banco de Dados**: PostgreSQL (Hospedado em `chaoticcow-postgres.cloudfy.live`)
- **Mensageria**: Evolution API (WhatsApp)
- **Integração IA**: Preparado para integração com Claude/Perplexity via Webhooks.

## 📂 Estrutura de Arquivos
- `finance_assistant_workflow.json`: O fluxo completo para importar no n8n.
- `init_db.sql`: Script de criação das tabelas e dados iniciais.
- `analise_financeira.md`: Diagnóstico estratégico das finanças (Rodrigo & Jennifer).

## 🤖 Instruções para IAs (Claude/Perplexity)
Para interagir com este sistema:
1. O banco de dados possui as tabelas `usuarios` (metas e saldos) e `transacoes` (histórico).
2. O workflow do n8n processa as entradas via Webhook.
3. A lógica de "sobra" é calculada subtraindo as saídas fixas (R$ 11.480) das entradas (R$ 9.080).

---
*Configurado por Manus AI em 25/04/2026.*
