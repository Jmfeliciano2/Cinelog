# prompts.md — Registro de Prompts Utilizados

## IAs Consultadas

1. **Claude (Anthropic)**
2. **Copilot (Microsoft)**
3. **Gemini (Google)**

---

## Prompt Utilizado

> Crie uma aplicação web com HTML, CSS e JavaScript puro, sem frameworks. A aplicação deve ter uma tela de login com usuário `aluno` e senha `fiap2025`. Se as credenciais estiverem erradas ou os campos vazios, exibir mensagem de erro na tela. Após o login, exibir uma lista de filmes com pelo menos 3 itens iniciais armazenados em um array de strings. O usuário deve poder adicionar um item ao início, adicionar ao final, editar individualmente e remover pelo índice. A tela deve atualizar automaticamente a cada mudança. Toda a lógica deve estar em funções nomeadas.

---

## Problemas Encontrados

### GitHub Copilot
O HTML gerado era bem simples, usando `<ul>` e `<li>` com IDs como `#login-screen` e `#app-screen`. O problema é que o CSS usava classes completamente diferentes, como `.movie-item` e `.filmstrip`, que não existiam no HTML — então a página ficou sem nenhum estilo aplicado. Além disso, não havia botão de logout.

### Gemini
O código funcionava, com funções nomeadas e estrutura organizada. Porém a edição de itens usava `window.prompt()`, que abre uma janela nativa do navegador fora da interface, o que quebra a experiência visual da aplicação. O CSS também era muito básico, sem nenhuma identidade visual. Sem botão de logout também.

### Claude
Gerou a aplicação com tema **CineLog**, design escuro com card de login estilizado, edição inline direto no item da lista, mensagens de erro dentro da tela, contagem dinâmica de filmes e botão de logout. HTML e CSS completamente compatíveis entre si. Todos os requisitos atendidos sem inconsistências.

---

## Justificativa da Escolha

O código do **Claude** foi escolhido como base por ser o único que entregou tudo funcionando: edição inline sem `prompt()`, mensagens de erro na tela, HTML e CSS compatíveis, botão de logout e um design coeso com o tema escolhido.