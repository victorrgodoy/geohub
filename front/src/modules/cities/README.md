# Módulo Cities

Responsável por gerenciar as cidades da aplicação.

## Estrutura
- `types/` - Tipos TypeScript relacionados a cidades
- `services/` - Serviços de API para operações CRUD de cidades
- `components/` - Componentes React específicos de cidades (mapas, listas)
- `hooks/` - Hooks customizados para gerenciar estado de cidades

## API
- `createCity(city)` - Cria nova cidade
- `listAllCity()` - Lista todas as cidades
- `updateCity(id, city)` - Atualiza cidade
- `deleteCity(id)` - Remove cidade

## Uso
```typescript
import { listAllCity, type City } from '@/modules/cities';

const cities = await listAllCity();
```