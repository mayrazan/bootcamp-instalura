# Instalura

Projeto desenvolvido durante o bootcamp de frontend avançado JAMStack da Alura.
Durante os módulos do bootcamp, passamos por estilizações dos componentes com styled-componentes, processo de integração e entrega contínua, validação de formulário, conceitos de arquitetura, vimos testes com Jest, Cypress e React Testing Library, como hospedar aplicações na vercel, como e o porquê de usar graphQL, como montar um design systems utilizando storybook, como trabalhar com monorepo configurando ambiente com yarn workspace, aprendemos a incluir typescript no projeto, fora inúmeras boas práticas que desenvolvemos ao longo desses módulos.

## Demo

https://bootcamp-instalura.vercel.app/

## Run Locally

Clone the project

```bash
  git clone https://github.com/mayrazan/bootcamp-instalura.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-styled-components with-styled-components-app
# or
yarn create next-app --example with-styled-components with-styled-components-app
```

## Tech Stack

- React
- NextJS
- Styled-Components
- Framer-motion
- React Lottie
- Prop-Types

## Desafio Final

**1) Criar a página /app/profile**

- Layout: [figma](https://www.figma.com/file/VkYdIpElN9qdnCfoZ2iwXG/Instalura?node-id=0%3A1)

- [ ] Criar o menu da área logado
- [ ] Implementar em código React o layout da página de perfil usando toda a estrutura de componentes criada no módulo 1 e aprimorada ao longo do Curso (usando Grid, Text, Modal...)

**2) Criar o registro de imagens**

- [ ] No menu existe um botão "+" que ao ser clicado, deverá abrir um modal: [Layout](https://www.figma.com/file/VkYdIpElN9qdnCfoZ2iwXG/Instalura?node-id=81%3A1123)
- [ ] Esse modal deverá receber uma URL, após isso o botão avançar irá ser mostrado
- [ ] Após avançar, o usuário poderá clicar em um quadrado, estilo o próprio instagram, com o preview da URL que ele inseriu na etapa anterior.
      [Layout](https://www.figma.com/file/VkYdIpElN9qdnCfoZ2iwXG/Instalura?node-id=81%3A1418)
- [ ] Esse click vai uma classe CSS que aplica um filtro estilo instagram baseado nesse [projeto](https://picturepan2.github.io/instagram.css/)
- [ ] [Carrossel](https://css-tricks.com/css-only-carousel/) para mostrar as diversas opções
- [ ] Ao final, quando o usuário clicar em postar, deve ser enviado para esse endpoint: /api/posts/
- [ ] O post deve aparecer no feed do usuário

**3) Criar a opção de dar like em uma foto do feed**

- [ ] O botão de like por padrão não aparece, somente quando damos "focus" ou "hover" nas imagens
- [ ] Ao clicar, o coração deverá ficar vermelho (fazer efeito com lottie é um bônus)
- [ ] O número de likes deve incrementar ou decrementar

**Obrigatório**

- [ ] Criar um Teste no cypress fazendo o fluxo de adicionar uma imagem no Feed

**Testes**

- [ ] Fazer lazy loading nas imagens do feed
- [ ] Evite carregar todas na hora que a página carrega
- [ ] Fazer testes para todos os serviços criados para abstrair conexão com backend e guardar lógicas em cima disso
- [ ] Fazer testes para os componentes Criados

## Endpoints Importantes para esse desafio

**URL base da API: https://instalura-api.vercel.app/**

**Login**
URL: /api/login/
Body:

```json
{
  "username": "omariosouto",
  "password": "senhasegura"
}
```

**Feed do Usuário**
URL: /api/users/posts/

Headers: Lembrar de enviar o TOKEN do usuário em Authorization

**Criar post**
URL: /api/posts/

Headers: Lembrar de enviar o TOKEN do usuário em Authorization

Body:

```json
{
  "photoUrl": "https://unavatar.now.sh/github/omariosouto",
  "description": "Legenda do post",
  "filter": "none" // Remember to add options as named here: https://picturepan2.github.io/instagram.css/
}
```

**Like/Dislike**
URL: /api/posts/<ID>/like (ID exemplo: 60649c6682bf5808e2b0d472)

Headers: Lembrar de enviar o TOKEN do usuário em Authorization

Body:

```json
{}
```
