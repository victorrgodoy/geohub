# GeoHub Frontend

Interface web para gerenciamento de dados geográficos (continentes, países e cidades) construída com React, Vite, TypeScript e TailwindCSS.

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
