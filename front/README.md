# 🎨 GeoHub Frontend# React + TypeScript + Vite



Interface moderna e responsiva desenvolvida com **React**, **TypeScript**, **TailwindCSS** e integração com **World Bank API** para visualização de dados geográficos e estatísticas globais.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 📋 SobreCurrently, two official plugins are available:



Frontend do GeoHub que fornece uma interface intuitiva para gerenciar continentes, países e cidades, com visualização de estatísticas em tempo real e integração de dados econômicos globais.- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 🛠️ Tecnologias

## React Compiler

- **React 18** - Biblioteca para construção de interfaces

- **TypeScript** - Superset JavaScript com tipagem estáticaThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Vite** - Build tool rápido e moderno

- **TanStack Query v5** - Gerenciamento de estado assíncrono## Expanding the ESLint configuration

- **React Router DOM** - Navegação e roteamento

- **TailwindCSS** - Framework CSS utilitárioIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- **Axios** - Cliente HTTP

- **Lucide React** - Biblioteca de ícones```js

- **World Bank API** - Dados econômicos globaisexport default defineConfig([

  globalIgnores(['dist']),

## 📁 Estrutura do Projeto  {

    files: ['**/*.{ts,tsx}'],

```    extends: [

front/      // Other configs...

├── public/

│   └── images/      // Remove tseslint.configs.recommended and replace with this

│       └── continents/         # Imagens dos continentes      tseslint.configs.recommendedTypeChecked,

├── src/      // Alternatively, use this for stricter rules

│   ├── App.tsx                 # Configuração de rotas      tseslint.configs.strictTypeChecked,

│   ├── main.tsx                # Ponto de entrada      // Optionally, add this for stylistic rules

│   ├── index.css               # Estilos globais      tseslint.configs.stylisticTypeChecked,

│   ├── modules/

│   │   ├── cities/             # Módulo de cidades      // Other configs...

│   │   │   ├── components/    ],

│   │   │   ├── hooks/    languageOptions: {

│   │   │   ├── services/      parserOptions: {

│   │   │   └── types/        project: ['./tsconfig.node.json', './tsconfig.app.json'],

│   │   ├── continents/         # Módulo de continentes        tsconfigRootDir: import.meta.dirname,

│   │   ├── countries/          # Módulo de países      },

│   │   ├── overview/           # Módulo de dashboard      // other options...

│   │   │   └── components/    },

│   │   │       ├── StatCard.tsx  },

│   │   │       └── GlobalInsightsCard.tsx])

│   │   └── worldbank/          # Integração World Bank API```

│   │       ├── hooks/

│   │       ├── services/You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

│   │       └── types/

│   ├── pages/```js

│   │   ├── OverviewPage.tsx    # Dashboard principal// eslint.config.js

│   │   ├── ContinentsPage.tsx  # CRUD de continentesimport reactX from 'eslint-plugin-react-x'

│   │   ├── CountriesPage.tsx   # CRUD de paísesimport reactDom from 'eslint-plugin-react-dom'

│   │   └── CitiesPage.tsx      # CRUD de cidades

│   ├── shared/export default defineConfig([

│   │   ├── components/         # Componentes reutilizáveis  globalIgnores(['dist']),

│   │   │   ├── DataTable.tsx  {

│   │   │   ├── Pagination.tsx    files: ['**/*.{ts,tsx}'],

│   │   │   ├── Select.tsx    extends: [

│   │   │   ├── SearchInput.tsx      // Other configs...

│   │   │   ├── ConfirmationModal.tsx      // Enable lint rules for React

│   │   │   ├── DataSourceInfo.tsx      reactX.configs['recommended-typescript'],

│   │   │   ├── Header.tsx      // Enable lint rules for React DOM

│   │   │   └── Sidebar.tsx      reactDom.configs.recommended,

│   │   ├── contexts/           # Contextos globais    ],

│   │   │   └── theme/    languageOptions: {

│   │   ├── layouts/      parserOptions: {

│   │   │   └── MainLayout.tsx        project: ['./tsconfig.node.json', './tsconfig.app.json'],

│   │   ├── services/        tsconfigRootDir: import.meta.dirname,

│   │   │   └── api.ts          # Configuração Axios      },

│   │   └── utils/      // other options...

│   │       ├── formatNumber.ts    },

│   │       └── formatDate.ts  },

│   ├── tailwind.config.js])

│   ├── vite.config.ts```

│   └── tsconfig.json
```

## 🔧 Instalação

### 1. Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend rodando em `http://localhost:3000`

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_BACKEND_API_URL=http://localhost:3000
VITE_WORLD_BANK_API_URL=https://api.worldbank.org/v2
```

### 4. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

## 🎯 Funcionalidades

### 📊 Dashboard (Overview)
- **StatCards animados**: População, países e continentes registrados
- **GlobalInsightsCard**: Dados do World Bank (GDP, Life Expectancy, Urban Population, GDP per Capita)
- **Top 5 países**: Tabela com os países mais populosos
- **Carrossel mobile**: Estatísticas em carrossel para telas pequenas
- **DataSourceInfo**: Informações sobre as fontes de dados

### 🌍 Continentes
- Listagem em tabela com paginação
- Pesquisa em tempo real
- CRUD completo (Create, Read, Update, Delete)
- Modal de criação/edição
- Confirmação antes de deletar
- 7 continentes pré-definidos

### 🏳️ Países
- Listagem em tabela com paginação
- Filtro por continente
- Pesquisa em tempo real
- CRUD completo
- Exibição de bandeiras
- Dados: nome, população, moeda, idioma oficial
- Modal de criação/edição com validação

### 🏙️ Cidades
- Listagem em tabela com paginação
- **Filtros mutuamente exclusivos**:
  - Por país
  - Por continente
- Pesquisa em tempo real
- CRUD completo
- Dados: nome, país, população, coordenadas (lat/long)
- Modal de criação/edição

## 🎨 Temas

### Tema Claro/Escuro
- Toggle persistente no Sidebar
- Armazenamento no localStorage
- Transições suaves entre temas
- Adaptação de todos os componentes

## 📦 Componentes Principais

### StatCard
Card animado com:
- Ícone colorido
- Título
- Valor com animação de contagem
- Data de atualização
- Loading state

### GlobalInsightsCard
Card com dados do World Bank:
- GDP Global
- Expectativa de Vida
- População Urbana (%)
- GDP per Capita
- Layout 2x2 em grid
- Loading states
- Link para fonte de dados

### DataTable
Tabela genérica e reutilizável:
- Suporte a colunas customizadas
- Ações por linha (editar/deletar)
- Renderização customizada de células
- Empty state
- Loading state

### Select
Dropdown customizado com:
- Pesquisa integrada
- Limpeza de seleção
- Suporte a placeholder
- Acessibilidade (keyboard navigation)
- Dark mode

### Pagination
Componente de paginação com:
- Navegação entre páginas
- Seleção de itens por página
- Informações de registros
- Responsivo

## 🔌 Integração com APIs

### Backend (GeoHub API)
```typescript
// src/shared/services/api.ts
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 10000,
});
```

### World Bank API
```typescript
// src/modules/worldbank/services/worldbank.ts
const WORLD_BANK_API = import.meta.env.VITE_WORLD_BANK_API_URL;

export const fetchGlobalStats = async (): Promise<GlobalStats> => {
  const [population, gdp, lifeExpectancy, urbanPopulation] = await Promise.all([
    fetchIndicator("SP.POP.TOTL"),
    fetchIndicator("NY.GDP.MKTP.CD"),
    fetchIndicator("SP.DYN.LE00.IN"),
    fetchIndicator("SP.URB.TOTL.IN.ZS"),
  ]);
  // ...
};
```

## 🔄 Gerenciamento de Estado

### TanStack Query (React Query)
Cache inteligente e sincronização:

```typescript
// Hooks com cache de 5 minutos
export const useListCity = (filters?: CityFilters) => {
  return useQuery({
    queryKey: ["cities", filters],
    queryFn: () => listAllCity(filters),
    staleTime: 1000 * 60 * 5,
  });
};

// Mutations com invalidação automática
export const useCreateCity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });
};
```

### Context API
Tema global com persistência:

```typescript
// src/shared/contexts/theme/ThemeProvider.tsx
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  // ...
};
```

## 🧪 Scripts Disponíveis

```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run preview          # Preview do build
npm run lint             # Verificar código
```

## 🎨 Customização

### TailwindCSS
Configuração em `tailwind.config.js`:

```javascript
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
    },
  },
};
```

### Cores e Temas
- **Light Mode**: Branco, cinzas claros
- **Dark Mode**: Cinzas escuros (#0f172a, #1e293b)
- **Accent**: Azul (#3b82f6, #60a5fa)

## 🌐 Rotas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | OverviewPage | Dashboard principal |
| `/continents` | ContinentsPage | Gerenciamento de continentes |
| `/countries` | CountriesPage | Gerenciamento de países |
| `/cities` | CitiesPage | Gerenciamento de cidades |

## 📱 Responsividade

- **Mobile First**: Design otimizado para mobile
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- **Sidebar**: Drawer animado em mobile, fixo em desktop
- **Tabelas**: Scroll horizontal em telas pequenas
- **Carrossel**: StatCards em carrossel no mobile

## ⚡ Performance

- **Code Splitting**: Rotas com lazy loading
- **Memoização**: React.memo em componentes pesados
- **Cache**: TanStack Query com staleTime otimizado
- **Debounce**: Pesquisa com debounce de 300ms
- **Virtualização**: Listas grandes com paginação

## 🔒 Boas Práticas

- **TypeScript**: 100% tipado
- **ESLint**: Configuração com regras do React
- **Atomic Design**: Componentes reutilizáveis
- **Clean Code**: Nomes descritivos, funções pequenas
- **Separation of Concerns**: Módulos independentes

## 🐛 Troubleshooting

### Erro de conexão com backend
Verifique se:
1. Backend está rodando em `http://localhost:3000`
2. `.env` está configurado corretamente
3. CORS está habilitado no backend

### Tema não persiste
Limpe o localStorage e recarregue:
```javascript
localStorage.clear();
location.reload();
```

### World Bank API não carrega
Verifique:
1. Conexão com a internet
2. URL da API no `.env`
3. Console do navegador para erros de CORS

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [World Bank API Documentation](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation)

## 👤 Autor

**Victor Godoy**
- GitHub: [@victorrgodoy](https://github.com/victorrgodoy)
