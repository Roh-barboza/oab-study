# Auditoria de segurança — 07/09/2026

## Escopo

Repositório público `Roh-barboza/oab-study`, incluindo árvore atual, histórico Git alcançável, arquivos misturados de um projeto financeiro e configuração pública relacionada ao deploy.

## Achados principais

- Foi identificado um segredo de API em texto claro em conteúdo histórico do projeto financeiro. O valor do segredo não é reproduzido neste documento.
- O segredo deve ser considerado comprometido por ter sido versionado em repositório público.
- Também foram identificados arquivos financeiros e dados não relacionados ao projeto OAB.

## Ação obrigatória fora do GitHub

1. Revogar a credencial antiga no provedor Evolution API/Cloudfy.
2. Gerar uma nova credencial apenas se o fluxo financeiro ainda precisar dela.
3. Armazenar a nova credencial somente em ambiente privado/seguro, nunca em arquivo versionado.
4. Confirmar que a credencial antiga foi desativada antes de reescrever o histórico Git.

## Correções aplicadas na branch de auditoria

- Remoção dos artefatos financeiros do estado atual do projeto OAB.
- Remoção de arquivos JS/CSS legados que não são referenciados pelo `index.html` atual.
- Inclusão de `.gitignore` para arquivos de ambiente, chaves, metadados locais e dependências.
- Documentação do risco sem registrar o valor do segredo.
- Preservação de `database.js` sem alteração jurídica nesta etapa.

## Limitação importante

Excluir um arquivo da versão atual NÃO remove seu conteúdo dos commits antigos. A limpeza do histórico deve ocorrer somente depois da rotação/revogação da credencial comprometida e com backup confirmado.

## Próxima etapa de segurança

Após a confirmação de revogação da credencial antiga:

- planejar a reescrita do histórico;
- remover o segredo e dados financeiros pessoais dos commits alcançáveis;
- atualizar o remoto de forma coordenada;
- validar novamente o repositório e o deploy.
