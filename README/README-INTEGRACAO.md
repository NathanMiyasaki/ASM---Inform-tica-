# Kit de Integração — A.S.M Informática

Este guia mostra como encaixar backend, banco de dados e área administrativa no front-end que você já criou com HTML, Bootstrap e JavaScript.

## 1. O que este kit adiciona

- Servidor Node.js com Express.
- Banco SQLite criado automaticamente.
- Produtos vindos do banco na página inicial.
- Formulário de contato salvando mensagens no banco.
- Área administrativa com login.
- CRUD de produtos.
- Tela administrativa para ver mensagens recebidas.

## 2. Como instalar

No terminal, dentro da pasta do projeto:

```bash
npm install
```

Depois execute:

```bash
npm start
```

Acesse:

```text
http://localhost:3000
```

Área administrativa:

```text
http://localhost:3000/admin/
```

Login padrão:

```text
E-mail: admin@startup.local
Senha: 123456
```

## 3. Arquivos que você deve copiar

Copie para o seu projeto:

- `server.js`
- `db.js`
- `package.json`
- `package-lock.json`
- pasta `public/admin/`
- pasta `public/assets/js/`
- pasta `public/assets/css/`, se você ainda não tiver CSS próprio

Se você já criou `public/index.html` e `public/contato.html`, não precisa substituir esses arquivos. Adapte apenas os IDs indicados abaixo.

## 4. Integração na página inicial

Na página inicial, crie ou mantenha uma área onde os produtos serão carregados:

```html
<div id="products" class="row g-4"></div>
```

No final do `body`, adicione:

```html
<script type="module" src="/assets/js/index.js"></script>
```

Fluxo:

1. O navegador carrega `index.js`.
2. O JavaScript chama `GET /api/products`.
3. O Express consulta a tabela `products`.
4. O banco devolve os produtos ativos.
5. O JavaScript monta os cards no HTML.

## 5. Integração na página de contato

O formulário precisa ter estes IDs:

```html
<div id="feedback"></div>

<form id="contactForm" novalidate>
    <input id="name" name="name" type="text">
    <input id="email" name="email" type="email">
    <input id="subject" name="subject" type="text">
    <textarea id="message" name="message"></textarea>
    <button id="submitBtn" type="submit">Enviar mensagem</button>
</form>
```

No final do `body`, adicione:

```html
<script type="module" src="/assets/js/contato.js"></script>
```

Fluxo:

1. O usuário preenche o formulário.
2. O JavaScript valida os campos.
3. O JavaScript envia os dados para `POST /api/contacts`.
4. O Express valida novamente no servidor.
5. O SQLite salva a mensagem na tabela `contacts`.
6. O usuário vê uma mensagem de sucesso ou erro.

## 6. Área administrativa

A pasta `public/admin/` já possui as telas prontas:

- `login.html`
- `index.html`
- `create.html`
- `edit.html`
- `contacts.html`

O admin permite:

- entrar com login e senha
- listar produtos
- criar produto
- editar produto
- excluir produto
- ver mensagens de contato
- sair da sessão

## 7. Banco de dados

Você não precisa criar o banco manualmente.

Na primeira execução, o arquivo `db.js` cria:

- `database/app.sqlite`
- tabela `products`
- tabela `contacts`
- produtos iniciais de exemplo

## 8. Testes obrigatórios

Antes de entregar, confira:

- `npm start` abre o servidor sem erro.
- A página inicial mostra produtos.
- O formulário de contato salva uma mensagem.
- O admin abre em `/admin/`.
- O login funciona.
- Um produto criado no admin aparece na página inicial.
- Um produto inativo não aparece na página inicial.
- A tela `/admin/contacts.html` mostra as mensagens enviadas.

## 9. Mapa mental do projeto

```text
HTML
  chama JavaScript
    chama fetch()
      chama rotas do Express
        consulta ou grava no SQLite
      devolve JSON
    atualiza a tela
```
