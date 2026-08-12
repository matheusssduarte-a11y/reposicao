# 🌿 EcoFactory - Sistema de Gestão e Monitoramento Industrial Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.x-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blueviolet.svg)](https://www.postgresql.org/)

> **Projeto de Reposição SENAI** — 12/08/2026  
> **Autor:** Matheus Sosnoski Santos Duarte  
> **Instituição:** SENAI  

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Contexto e Situação Problema](#-contexto-e-situação-problema)
- [Público-Alvo](#-público-alvo)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Modelo de Dados (PostgreSQL)](#-modelo-de-dados-postgresql)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
  - [1. Clonar o Repositório](#1-clonar-o-repositório)
  - [2. Configurar o Banco de Dados](#2-configurar-o-banco-de-dados)
  - [3. Configurar e Rodar o Back-End](#3-configurar-e-rodar-o-back-end)
  - [4. Configurar e Rodar o Front-End](#4-configurar-e-rodar-o-front-end)
- [Executando os Testes](#-executando-os-testes)
- [Prototipação e Design](#-prototipação-e-design)
- [Licença](#-licença)

---

## 📄 Sobre o Projeto

O **EcoFactory** é uma aplicação web **Full Stack** voltada para o monitoramento e a gestão eficiente de processos em uma indústria inteligente (Indústria 4.0). O projeto consolida a gestão de maquinários, registros de produção industrial, consumo de recursos sustentáveis (água e energia) e ocorrências de Saúde e Segurança do Trabalho (SST) em uma plataforma centralizada e de fácil acesso.

---

## 🎯 Contexto e Situação Problema

A empresa fictícia **EcoFactory** opera no setor industrial e ainda registra suas informações críticas em planilhas descentralizadas e documentos avulsos. Esse fluxo manual gera gargalos como:
* Dificuldade no acompanhamento da produção em tempo real;
* Falta de previsibilidade e controle sobre o estado das máquinas;
* Ausência de consolidação dos indicadores de consumo de água e energia;
* Lentidão na identificação de ocorrências de saúde e segurança;
* Comprometimento da tomada de decisão estratégica e sustentável.

**Objetivo:** Desenvolver de forma colaborativa uma solução web moderna com interface responsiva, API REST, persistência em banco de dados relacional, suíte de testes e documentação técnica completa.

---

## 👥 Público-Alvo

* **Clientes e Parceiros da EcoFactory:** Para acompanhamento do compromisso sustentável e relatórios de eficiência.
* **Gestores e Operadores Industriais:** Para monitoramento diário, controle operacional das máquinas e análise dos indicadores de produtividade e SST.

---

## ✨ Funcionalidades Principais

- [x] **CRUD Completo de Máquinas:** Cadastro, listagem, atualização de status de funcionamento (Ativa, Em Manutenção, Inativa) e remoção.
- [x] **Registro e Consulta de Produção:** Lançamento diário de lotes produzidos e histórico filtrável por período/equipamento.
- [x] **Gestão de Sustentabilidade & Recursos:** Registro e cálculo do consumo de energia (kWh) e água (L).
- [x] **Controle de Ocorrências (SST):** Registro de incidentes e eventos de saúde e segurança operacional.
- [x] **Dashboard de Indicadores:** Visualização gráfica intuitiva com KPIs de produtividade, status dos equipamentos e metas de sustentabilidade.
- [x] **Validação do Front-End:** Validação rigorosa em todos os formulários antes do envio para a API REST.
- [x] **Persistência Confiável:** Armazenamento seguro e estruturado em PostgreSQL.

---

## 🛠️ Tecnologias Utilizadas

### **Front-End**
* **Library:** React (v18+)
* **Build Tool:** Vite
* **Linguagem:** JavaScript (ES6+)
* **Requisições HTTP:** Axios / Fetch API

### **Back-End**
* **Runtime:** Node.js
* **Framework Web:** Express.js
* **Driver / DB:** `pg` (node-postgres) ou Prisma / Sequelize

### **Banco de Dados**
* **SGBD:** PostgreSQL (Local, Neon.tech ou Supabase)

### **Testes**
* **Front-End:** Vitest + React Testing Library
* **Back-End:** Jest + Supertest

### **Ferramentas de Suporte & Versionamento**
* **Versionamento:** Git & GitHub
* **Prototipação:** Figma / Canva

---

## 🏗️ Arquitetura do Sistema

```text
ecofactory/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Lógica de controle das rotas
│   │   ├── models/           # Consultas e tabelas do banco de dados
│   │   ├── routes/           # Definição dos endpoints REST
│   │   ├── middlewares/      # Validações e tratamento de erros
│   │   └── database/         # Configuração da conexão PostgreSQL
│   ├── tests/                # Testes automatizados (Jest / Supertest)
│   ├── .env.example          # Exemplo de variáveis de ambiente
│   ├── package.json
│   └── server.js             # Ponto de entrada da aplicação
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas (Dashboard, Máquinas, Produção, SST)
│   │   ├── services/         # Configuração da API REST (Axios/Fetch)
│   │   └── styles/           # Arquivos de estilização global
│   ├── src/__tests__/        # Testes de componentes (Vitest / RTL)
│   ├── package.json
│   └── vite.config.js
└── README.md# reposicao
