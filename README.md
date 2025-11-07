# 🌍 GeoHub

**GeoHub** é uma aplicação full-stack para gerenciamento de dados geográficos, integrando APIs externas para enriquecer informações de países, continentes e cidades com dados econômicos e estatísticos globais.

## 📋 Sobre o Projeto

O GeoHub permite:
- **CRUD completo** de Continentes, Países e Cidades
- **Integração com APIs externas**:
  - **REST Countries API**: Dados reais de países (moedas, idiomas, população, bandeiras)
  - **World Bank API**: Estatísticas econômicas globais (PIB, expectativa de vida, população urbana)
- **Interface moderna** com tema claro/escuro
- **Filtros avançados** por continente e país
- **Visualização de dados** com tabelas, cards e estatísticas

## 🏗️ Arquitetura do Projeto

```
geohub/
├── backend-geohub/     # API REST com NestJS + Prisma + PostgreSQL
└── front/              # Interface React + TypeScript + TailwindCSS
```

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **TypeScript** - Tipagem estática
- **Axios** - Requisições HTTP para APIs externas

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **TanStack Query v5** - Gerenciamento de estado assíncrono
- **TailwindCSS** - Framework CSS utilitário
- **Vite** - Build tool moderno
- **Lucide React** - Ícones modernos

### APIs Externas
- **REST Countries API** - Dados complementares de países
- **World Bank API** - Dados econômicos globais

## 📦 Pré-requisitos

- **Node.js** 18+ e npm/yarn
- **PostgreSQL** 14+
- **Git**

## 🔧 Instalação e Configuração

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

Execute as migrations do Prisma:

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
cd ../front
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

## 📚 Documentação Detalhada

- [Backend README](./backend-geohub/README.md) - Documentação completa da API
- [Frontend README](./front/README.md) - Documentação da interface

## 🎯 Funcionalidades Principais

### 📊 Dashboard (Overview)
- Estatísticas em tempo real (população, países, continentes)
- Dados econômicos globais do World Bank
- Top 5 países por população
- Informações sobre fontes de dados

### 🌎 Continentes
- Listagem com pesquisa
- CRUD completo
- 7 continentes pré-definidos

### 🏳️ Países
- CRUD completo com filtro por continente
- Dados reais da REST Countries API
- Informações: nome, população, moeda, idioma, bandeira

### 🏙️ Cidades
- CRUD completo
- Filtros por país ou continente (mutuamente exclusivos)
- 100 cidades principais do mundo
- Dados: nome, país, população, coordenadas

## 🔑 Endpoints da API

### Continentes
- `GET /continent` - Listar todos
- `GET /continent/:id` - Buscar por ID
- `POST /continent` - Criar
- `PUT /continent/:id` - Atualizar
- `DELETE /continent/:id` - Deletar

### Países
- `GET /country` - Listar todos (com filtros)
- `GET /country/:id` - Buscar por ID
- `GET /country/stats/total-country` - Total de países
- `GET /country/stats/total-population` - População total
- `POST /country` - Criar
- `PUT /country/:id` - Atualizar
- `DELETE /country/:id` - Deletar

### Cidades
- `GET /city` - Listar todas (com filtros: `?countryId=1` ou `?continentId=2`)
- `GET /city/:id` - Buscar por ID
- `GET /city/stats/total-city` - Total de cidades
- `POST /city` - Criar
- `PUT /city/:id` - Atualizar
- `DELETE /city/:id` - Deletar

## 🎨 Interface

- **Tema Claro/Escuro**: Toggle persistente no localStorage
- **Responsivo**: Design mobile-first
- **Loading States**: Feedback visual em todas as operações
- **Modais**: Criação e edição com validação
- **Paginação**: Tabelas com controle de itens por página
- **Busca**: Filtro de texto em tempo real

## 🧪 Scripts Úteis

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

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

## 👤 Autor

**Victor Godoy**
- GitHub: [@victorrgodoy](https://github.com/victorrgodoy)

---

⭐ Se este projeto foi útil, considere dar uma estrela!