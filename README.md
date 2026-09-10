# 🌿EcoFactory -- Indústria Inteligente

##  📌 Sobre o projeto

A EcoFactory é uma empresa fictícia do setor industrial. O projeto
consiste no desenvolvimento de uma aplicação web Full Stack voltada ao
monitoramento e à gestão de processos de uma indústria inteligente.

A aplicação busca centralizar informações importantes da empresa,
facilitando o acompanhamento das máquinas, a visualização de indicadores
e a tomada de decisões.

## 🚨 Situação-problema

A empresa fictícia EcoFactory ainda registra informações importantes
em planilhas e documentos separados. Essa forma de trabalho dificulta o
acompanhamento da produção, o controle das máquinas, a análise de
indicadores e a tomada de decisão.

As principais informações envolvidas são:

Máquinas utilizadas na produção;

Quantidade de produtos fabricados;

Consumo de energia e água;

Situação de funcionamento dos equipamentos;

Ocorrências relacionadas à saúde e segurança;

Indicadores de produtividade e sustentabilidade.

## 🎯 Objetivo

Desenvolver, de forma colaborativa, uma aplicação web Full Stack
para o monitoramento e a gestão de processos de uma indústria
inteligente, integrando interface responsiva, API REST, banco de dados,
versionamento, testes e documentação técnica.

## 👥 Público

Clientes da empresa fictícia EcoFactory.

## ⚙️ Funcionalidades

CRUD completo de máquinas;

Cadastro e consulta de produção;

Dashboard com indicadores básicos;

Persistência de dados no PostgreSQL;

Integração do Front-End com a API REST;

Validação dos principais formulários;

README com instruções de execução do projeto.

Funcionalidades atualmente implementadas

Cadastro de usuários;

Login;

Dashboard inicial;

Cadastro de máquinas;

Consulta/listagem de máquinas;

Edição de máquinas;

Exclusão de máquinas;

Persistência das máquinas no PostgreSQL;

Integração entre Front-End, API REST e banco de dados.

## 🛠️ Tecnologias

Front-End

HTML

CSS

JavaScript

React

Vite

Fetch API ou Axios

Back-End

Node.js

Express

Banco de Dados

PostgreSQL local, Neon ou Supabase

Versionamento

Git

GitHub

Testes

Vitest

React Testing Library

Jest

Supertest

Prototipação

Figma

Canva

Ferramenta equivalente

## 📁 Estrutura do projeto

EcoFactorySite/
├── backend/
│   ├── routes/
│   │   ├── usuarios.js
│   │   └── maquinas.js
│   ├── src/
│   │   ├── database.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── css/
│   ├── html/
│   └── js/
└── README.md

## 🗄️ Banco de dados

O projeto utiliza o PostgreSQL para armazenar os dados da aplicação.

As principais tabelas utilizadas atualmente são:

usuarios

maquinas

A tabela usuarios armazena os dados dos usuários cadastrados.

A tabela maquinas armazena as informações das máquinas e permite
realizar as operações de criação, consulta, atualização e exclusão.

🔌 API REST

O Back-End utiliza Node.js + Express para disponibilizar uma API
REST.

Usuários

POST /api/usuarios

Cadastra um novo usuário.

Login

POST /api/login

Realiza a autenticação do usuário.

Máquinas

GET /api/maquinas
POST /api/maquinas
PUT /api/maquinas/:id
DELETE /api/maquinas/:id

Esses endpoints permitem consultar, cadastrar, atualizar e excluir
máquinas.

## ▶️ Como executar o projeto

Pré-requisitos

Node.js;

PostgreSQL;

Git;

Navegador web;

Visual Studio Code (recomendado).

1. Instalar as dependências

Abra o terminal dentro da pasta backend e execute:

npm install

Caso necessário:

npm install express cors pg dotenv

2. Configurar o banco de dados

Crie um banco PostgreSQL chamado:

ecofactory

Na pasta backend, crie/configure o arquivo .env:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecofactory
DB_USER=postgres
DB_PASSWORD=SUA_SENHA

Importante: substitua SUA_SENHA pela senha do seu PostgreSQL e
não compartilhe o arquivo .env publicamente.

3. Iniciar o Back-End

Dentro da pasta backend:

npm start

O servidor deverá ficar disponível em:

http://localhost:3000

Para testar a conexão com o banco:

http://localhost:3000/api/teste-banco

4. Executar o Front-End

Utilize o Live Server do Visual Studio Code e abra:

frontend/html/index.html

O sistema será aberto no navegador.

🔐 Fluxo de utilização

Cadastro
   ↓
Login
   ↓
Dashboard
   ↓
Máquinas
   ↓
Cadastrar / Consultar / Editar / Excluir

## 💾 Persistência dos dados

Os dados das máquinas são armazenados no PostgreSQL por meio da API
REST. Dessa forma, os registros permanecem disponíveis após a
atualização da página.

## 🔄 Versionamento

O projeto utiliza Git para controle de versão e GitHub para
armazenamento e colaboração no código-fonte.

## 🧪 Testes

O projeto prevê a utilização de:

Vitest;

React Testing Library;

Jest;

Supertest.

Essas ferramentas podem ser utilizadas para testar componentes do
Front-End e endpoints da API.

## 🎨 Prototipação

A interface pode ser planejada e prototipada utilizando:

Figma;

Canva;

Ferramenta equivalente.

## 🌱 EcoFactory

A proposta da EcoFactory é utilizar tecnologia para facilitar o
monitoramento dos processos industriais, contribuindo para uma gestão
mais organizada das informações e para o acompanhamento de aspectos
relacionados à produtividade e sustentabilidade.

## 👨‍💻 Projeto acadêmico

Projeto desenvolvido para fins acadêmicos, com foco no desenvolvimento
colaborativo de uma aplicação web Full Stack utilizando tecnologias de
Front-End, Back-End, banco de dados e versionamento.
