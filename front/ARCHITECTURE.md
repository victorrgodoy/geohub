# GeoHub - Arquitetura Modular

### 📁 Estrutura do Projeto

```bash
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