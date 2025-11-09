# GeoHub Frontend

Interface web para gerenciamento de dados geográficos (continentes, países e cidades) construída com React, Vite, TypeScript e TailwindCSS.

### Tecnologias Principais

- **React 18** — Biblioteca para construção de interfaces
- **TypeScript** — Superset JavaScript com tipagem estática
- **Vite** — Build tool rápido e moderno
- **TanStack Query v5** — Gerenciamento de estado assíncrono
- **React Router DOM** — Navegação e roteamento
- **TailwindCSS** — Framework CSS utilitário
- **Axios** — Cliente HTTP

### 📁 Estrutura do Projeto

```plaintext
front/
├── public/
│   └── images/
│       └── continents/         # Imagens dos continentes
├── src/
│   ├── App.tsx                 # Configuração de rotas
│   ├── main.tsx                # Ponto de entrada
│   ├── index.css               # Estilos globais
│   ├── modules/
│   │   ├── cities/             # Módulo de cidades
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── continents/         # Módulo de continentes
│   │   ├── countries/          # Módulo de países
│   │   ├── overview/           # Módulo de dashboard
│   │   │   └── components/
│   │   │       ├── StatCard.tsx
│   │   │       └── GlobalInsightsCard.tsx
│   │   └── worldbank/          # Integração World Bank API
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types/
│   ├── pages/
│   │   ├── OverviewPage.tsx    # Dashboard principal
│   │   ├── ContinentsPage.tsx  # CRUD de continentes
│   │   ├── CountriesPage.tsx   # CRUD de países
│   │   └── CitiesPage.tsx      # CRUD de cidades
│   ├── shared/
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   ├── DataTable.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── ConfirmationModal.tsx
│   │   │   ├── DataSourceInfo.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── contexts/           # Contextos globais
│   │   ├── layouts/            # Layouts da aplicação
│   │   │   └── MainLayout.tsx
│   │   ├── services/           # Serviços da aplicação
│   │   │   └── api.ts          # Configuração Axios
│   │   └── utils/              # Funções utilitárias
│   │       ├── formatNumber.ts
│   │       └── formatDate.ts
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
```

## Instalação

### 1. Pré-requisitos

- Node.js 18+
- npm ou yarn

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_BACKEND_API_URL=<localhost_backend>
VITE_WORLD_BANK_API_URL=https://api.worldbank.org/v2
```

### 4. Iniciar servidor de desenvolvimento

```bash
npm run dev
```
## Funcionalidades

### Dashboard (Overview)
- **StatCards animados**: População, países e continentes registrados
- **GlobalInsightsCard**: Dados do World Bank (GDP, Life Expectancy, Urban Population, GDP per Capita)
- **Top 5 países**: Tabela com os países mais populosos
- **Carrossel mobile**: Estatísticas em carrossel para telas pequenas
- **DataSourceInfo**: Informações sobre as fontes de dados

### Continentes
- Listagem em tabela com paginação
- Pesquisa por nome
- CRUD completo
- Dados: nome, descrição
- Modal de criação/edição

### Países
- Listagem em tabela com paginação
- Pesquisa por nome
- Filtro por continente
- CRUD completo
- Dados: nome, população, moeda, idioma oficial
- Modal de criação/edição com validação

### Cidades
- Listagem em tabela com paginação
- Filtros por país ou continent:
- CRUD completo
- Dados: nome, país, população, coordenadas (lat/long)
- Modal de criação/edição

## Recursos

- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [World Bank API Documentation](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation)
