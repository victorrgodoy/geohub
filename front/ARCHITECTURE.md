# GeoHub - Arquitetura Modular

## Estrutura do Projeto

```
src/
├── modules/              # Módulos da aplicação (feature-based)
│   ├── continents/       # Módulo de continentes
│   ├── countries/        # Módulo de países
│   └── cities/           # Módulo de cidades
│
├── shared/               # Código compartilhado
│   ├── components/       # Componentes UI reutilizáveis
│   ├── services/         # Serviços base (axios config)
│   ├── hooks/            # Hooks genéricos
│   └── utils/            # Funções utilitárias
│
└── pages/                # Páginas/rotas da aplicação
```

## Princípios da Arquitetura

### 1. Modularização por Feature
Cada módulo é independente e contém:
- **types/** - Tipos TypeScript
- **services/** - Lógica de API
- **components/** - Componentes React específicos
- **hooks/** - Hooks customizados
- **index.ts** - Barrel export (API pública do módulo)

### 2. Separação de Responsabilidades
- **Módulos** = Features específicas (continents, countries, cities)
- **Shared** = Código reutilizável entre módulos
- **Pages** = Composição de módulos em rotas

### 3. Importações Limpas
Use os barrel exports para importar:
```typescript
// ✅ Bom
import { listAllCountry, type Country } from '@/modules/countries';

// ❌ Evitar
import { listAllCountry } from '@/modules/countries/services/country';
```

## Relacionamento dos Módulos

```
Continents (1)
    ↓
Countries (N) ← RestCountries API
    ↓
Cities (N)
```

## Próximos Passos
1. ✅ Estrutura modular criada
2. ⏳ Criar hooks customizados
3. ⏳ Criar componentes com Tailwind
4. ⏳ Configurar rotas (React Router)
5. ⏳ Criar páginas