# Módulo Continents

Responsável por gerenciar os continentes da aplicação.

## Estrutura
- `types/` - Tipos TypeScript relacionados a continentes
- `services/` - Serviços de API para operações CRUD de continentes
- `components/` - Componentes React específicos de continentes
- `hooks/` - Hooks customizados para gerenciar estado de continentes

## API
- `findById(id)` - Busca continente por ID
- `createContinent(continent)` - Cria novo continente
- `listAllContinent()` - Lista todos os continentes
- `updateContinent(id, continent)` - Atualiza continente
- `deleteContinent(id)` - Remove continente

## Uso
```typescript
import { listAllContinent, type Continent } from '@/modules/continents';

const continents = await listAllContinent();
```