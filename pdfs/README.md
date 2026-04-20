# Pasta `pdfs` - Documentos de Estudo para OAB

Esta pasta é destinada a armazenar os arquivos PDF que servirão como base para a geração de conteúdo de estudo e questões para o sistema OAB Study.

## Como Usar:

1.  **Upload dos PDFs:** Coloque seus arquivos PDF de estudo diretamente nesta pasta.
2.  **Processamento:** Para extrair o texto dos PDFs e prepará-lo para uso no sistema, você pode utilizar o script Python `pdf_processor.py` (a ser criado) ou integrar com ferramentas de automação como o n8n.

## Integração com n8n / Claude Code (Sugestão para Futuro SaaS):

Para automatizar o processo de extração de conteúdo e geração de questões a partir dos PDFs, sugiro o seguinte fluxo:

1.  **Gatilho (n8n):** Configure um *webhook* ou um monitoramento de pasta no n8n que seja acionado sempre que um novo PDF for adicionado à pasta `pdfs` (ou a um bucket S3, se o projeto escalar).
2.  **Extração de Texto (n8n/Python):** O n8n pode chamar um script Python (como o `pdf_processor.py`) para extrair o texto completo do PDF. Alternativamente, o próprio n8n pode ter módulos para isso ou integrar com serviços de OCR.
3.  **Processamento e Geração de Questões (Claude Code):** O texto extraído do PDF seria então enviado para o Claude (via API, por exemplo) com um prompt específico para:
    *   Resumir o conteúdo para a seção de matérias.
    *   Gerar as 8 questões de múltipla escolha, com 4 alternativas, gabarito e explicação, no formato JSON/JavaScript esperado pelo `database.js`.
4.  **Atualização do `database.js` (n8n/Script):** O output do Claude (as questões e resumos) seria então inserido ou atualizado no arquivo `database.js` do projeto. Isso pode ser feito por um script que o n8n executa, ou diretamente por uma ação do n8n que manipule o arquivo.

### Exemplo de Fluxo no n8n:

*   **Node 1:** `Webhook` (recebe notificação de novo PDF) ou `Watch Folder` (monitora a pasta `pdfs`).
*   **Node 2:** `Execute Command` (chama `python3 pdf_processor.py <caminho_do_pdf>`) ou `OCR Service` (para PDFs escaneados).
*   **Node 3:** `HTTP Request` (envia o texto extraído para a API do Claude com o prompt de geração de questões).
*   **Node 4:** `Function` (processa a resposta do Claude e formata para o `database.js`).
*   **Node 5:** `Write File` (atualiza o `database.js` no repositório).

Este fluxo garante que, ao adicionar um PDF, o sistema automaticamente extraia o conteúdo e gere as questões, mantendo o `database.js` sempre atualizado. Para a fase atual, focaremos na criação do script Python para extração de texto, que será a base para a automação futura.
