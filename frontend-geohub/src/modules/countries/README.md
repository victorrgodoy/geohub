# Módulo Countries

Responsável por gerenciar os países da aplicação.

## Estrutura
- `types/` - Tipos TypeScript relacionados a países
- `services/` - Serviços de API para operações CRUD de países + integração RestCountries
- `components/` - Componentes React específicos de países
- `hooks/` - Hooks customizados para gerenciar estado de países

## API
- `findByContinentId(continentId)` - Busca países por continente
- `createCountry(country)` - Cria novo país
- `listAllCountry()` - Lista todos os países
- `updateCountry(id, country)` - Atualiza país
- `deleteCountry(id)` - Remove país
- `totalCountry()` - Retorna total de países cadastrados
- `totalPopulation()` - Retorna população total
- `top5Country()` - Retorna top 5 países

## Uso
```typescript
import { listAllCountry, totalPopulation, type Country } from '@/modules/countries';

const countries = await listAllCountry();
const population = await totalPopulation();
```