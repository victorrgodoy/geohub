# GeoHub - Instruções para AI Agents

## Visão Geral do Projeto
GeoHub é uma aplicação de gerenciamento de dados geográficos (Continentes → Países → Cidades) construída com:
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend API**: REST API (URL configurada via `VITE_BACKEND_API_URL`)
- **API Externa**: RestCountries API (https://restcountries.com/v3.1)

## Arquitetura: Modular por Feature

### Estrutura de Módulos
```
src/modules/
├── continents/    # Gerenciamento de continentes
├── countries/     # Gerenciamento de países + integração RestCountries
└── cities/        # Gerenciamento de cidades (com coordenadas lat/lng)
```

Cada módulo contém:
- `types/` - Interfaces TypeScript
- `services/` - Chamadas de API
- `components/` - Componentes React específicos
- `hooks/` - Custom hooks
- `index.ts` - Barrel export (API pública)

### Código Compartilhado
```
src/shared/
├── services/api.ts    # Configuração Axios
├── components/        # Componentes UI reutilizáveis (Tailwind)
├── hooks/            # Hooks genéricos
└── utils/            # Funções utilitárias
```

## Comandos Essenciais

```bash
# Instalar dependências
npm install

# Desenvolvimento (porta 5173)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## Convenções de Código

### 1. Importações de Módulos
Use barrel exports para manter imports limpos:
```typescript
// ✅ Correto
import { listAllCountry, type Country } from '@/modules/countries';

// ❌ Evitar
import { listAllCountry } from '@/modules/countries/services/country';
```

### 2. Estrutura de Services
Todos os services seguem o padrão:
```typescript
import { api } from "@/shared/services/api";
import type { Entity, CreateEntity } from "../types/Entity";

const createEntity = async (entity: CreateEntity): Promise<Entity> => {
  const { data } = await api.post("/endpoint", entity);
  return data;
};

export { createEntity, listAll, update, delete };
```

### 3. Tipos TypeScript
Use `type` para criar interfaces de criação:
```typescript
interface Entity {
  id: number;
  name: string;
}

type CreateEntity = Omit<Entity, "id">;
```

### 4. Componentes com Tailwind
Prefira utility classes do Tailwind:
```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
```

## Relacionamento de Dados

```
Continent (1) → Country (N) → City (N)
              ↑
         RestCountries API
```

- **Continent**: id, name, description
- **Country**: id, name, population, official_language, currency, continentId
- **City**: id, name, population, latitude, longitude, countryId

## Variáveis de Ambiente

Criar `.env`:
```
VITE_BACKEND_API_URL=http://localhost:3000/api
```

## Quando Criar Novos Componentes

1. **Componentes específicos** → dentro do módulo (`modules/*/components/`)
2. **Componentes reutilizáveis** → em `shared/components/`

## Linting e Formatação

O projeto usa ESLint configurado pelo Vite. Erros de `@tailwind` no CSS podem ser ignorados (são resolvidos pelo PostCSS).