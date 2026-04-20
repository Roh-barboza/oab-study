# Guia Técnico: Automação com n8n e Claude para OAB Study

Este documento descreve como configurar um fluxo no n8n para automatizar a extração de conteúdo de PDFs e a geração de questões para o sistema.

## 1. Requisitos

*   Instância do **n8n** (Cloud ou Self-hosted).
*   API Key da **OpenAI** ou **Anthropic** (para o Claude).
*   Acesso ao repositório GitHub do projeto.

## 2. Estrutura do Fluxo (Workflow)

### Passo 1: Captura do Arquivo
*   **Node:** `Google Drive` / `Dropbox` / `S3` ou `Webhook`.
*   **Função:** Detectar quando um novo PDF é enviado para a pasta de estudos.

### Passo 2: Extração de Texto
*   **Node:** `Execute Command`.
*   **Comando:** `python3 pdf_processor.py {{ $binary.data.path }}`.
*   **Output:** O script gerará um arquivo `.txt` com o conteúdo.

### Passo 3: Geração de Conteúdo (AI)
*   **Node:** `Anthropic Claude` ou `OpenAI`.
*   **Prompt:**
    > "Com base no texto extraído do PDF abaixo, gere um resumo estruturado para a matéria e 8 questões de múltipla escolha no formato JavaScript esperado para o arquivo database.js.
    > 
    > Formato das Questões:
    > {
    >   id: [proximo_id],
    >   materia: "[id_materia]",
    >   enunciado: "...",
    >   alternativas: ["A) ...", "B) ...", "C) ...", "D) ..."],
    >   gabarito: [indice_0_a_3],
    >   explicacao: "..."
    > }
    > 
    > Texto: {{ $node["Execute Command"].json["text"] }}"

### Passo 4: Atualização do Repositório
*   **Node:** `GitHub`.
*   **Operação:** `Update File`.
*   **Arquivo:** `database.js`.
*   **Lógica:** O n8n deve ler o `database.js` atual, fazer o *append* das novas questões geradas pela IA e salvar de volta no GitHub.

## 3. Benefícios do Fluxo

*   **Escalabilidade:** Permite transformar centenas de páginas de PDF em questões em minutos.
*   **Consistência:** Garante que todas as questões sigam o mesmo padrão visual e pedagógico.
*   **Economia de Créditos:** Você só usa o Claude para o processamento final, economizando créditos manuais.

---

Este guia serve como base para a evolução do projeto para um **SaaS**, onde o usuário final poderá simplesmente "arrastar e soltar" um PDF e ver o sistema de questões ser atualizado instantaneamente.
