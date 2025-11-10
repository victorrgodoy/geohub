# GeoHub
<p align="center">
  <img src="assets/geohub_project.png" alt="Logo" />
</p>

<p align="start">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
</p>

**GeoHub** é uma aplicação full-stack para gerenciamento de dados geográficos, integrando APIs externas para enriquecer informações de países, continentes e cidades com dados econômicos e estatísticos globais.


## Funcionalidades

 - Visão geral dos dados registrados
 - CRUD completo de Continentes, Países e Cidades
 - Integração com REST Countries API (moedas, idiomas, população, bandeiras)
 - Integração com World Bank API (PIB, expectativa de vida, população urbana)
 - Interface moderna com tema claro/escuro
 - Filtros avançados por continente e país
 - Visualização de dados em tabelas, cards e estatísticas
 - Layout responsivo para desktop e mobile

## Estrutura do projeto

```bash
geohub/
├── assets/ 
├── backend-geohub/         
│   ├── prisma/
│   ├── src/
├── frontend-geohub/                
│   ├── public/
│   ├── src/             
├── README.md
└── ...
```

## Pré-requisitos
- **Node.js** 18+ e npm/yarn
- **PostgreSQL** 14+
- **Git**

##  Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/victorrgodoy/geohub.git
cd geohub
```

### 2. Configure o Backend

```bash
cd backend-geohub
npm install
```

Crie o arquivo `.env` baseado no `.env.example`:

```env
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=geohub 
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}?schema=public"
FRONTEND_URL=http://localhost:5173
REST_COUNTRIES_API_URL=https://restcountries.com/v3.1
```


Opcional — usar Docker para o banco de dados

> ⚠️ Antes de rodar o Docker, configure o arquivo `.env` corretamente com as variáveis do banco de dados.

Se preferir usar Docker para rodar o PostgreSQL, entre na pasta `backend-geohub` e execute:

```bash
docker-compose up -d
```

O `docker-compose.yml` do backend sobe um container PostgreSQL pronto para uso com as credenciais definidas no .env.

Rodar migrate para configurar o banco de dados
```bash
npx prisma migrate dev
```

Popule o banco de dados com seeds:

```bash
npm run seed:continent
npm run seed:country
npm run seed:city
```

Inicie o servidor:

```bash
npm run start:dev
```

O backend estará rodando em `http://localhost:3000`

### 3. Configure o Frontend

```bash
cd ../frontend-geohub
npm install
```

Crie o arquivo `.env` baseado no `.env.example`:

```env
VITE_BACKEND_API_URL=http://localhost:3000
VITE_WORLD_BANK_API_URL=https://api.worldbank.org/v2
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## Documentação Detalhada

- [Backend README](./backend-geohub/README.md) - Documentação completa da API
- [Frontend README](./front/README.md) - Documentação da interface

## Scripts Úteis

### Backend
```bash
npm run start:dev        # Servidor em modo watch
npm run build            # Build de produção
npm run seed:continent   # Popular continentes
npm run seed:country     # Popular países (REST Countries API)
npm run seed:city        # Popular 100 cidades
npx prisma studio        # Interface visual do banco
```

### Frontend
```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run preview          # Preview do build
npm run lint             # Verificar código
```

## Licença

Este projeto está licenciado sob a licença MIT. Copyright © 2025