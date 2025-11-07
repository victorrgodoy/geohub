# 🚀 GeoHub Backend<!-- <p align="center">

  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

API REST desenvolvida com **NestJS**, **Prisma ORM** e **PostgreSQL** para gerenciamento de dados geográficos com integração à REST Countries API.</p> -->



## 📋 Sobre## Description



Backend do GeoHub que fornece endpoints para gerenciar continentes, países e cidades, com integração de dados reais da REST Countries API.[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.



## 🛠️ Tecnologias## Project setup



- **NestJS 11** - Framework Node.js progressivo```bash

- **Prisma ORM** - Type-safe database client$ npm install

- **PostgreSQL** - Banco de dados relacional```

- **TypeScript** - Superset JavaScript com tipagem estática

- **Axios** - Cliente HTTP para integração com APIs externas## Compile and run the project

- **Class Validator** - Validação de DTOs

- **Class Transformer** - Transformação de objetos```bash

# development

## 📁 Estrutura do Projeto$ npm run start



```# watch mode

backend-geohub/$ npm run start:dev

├── prisma/

│   ├── schema.prisma           # Schema do banco de dados# production mode

│   └── migrations/             # Histórico de migrations$ npm run start:prod

├── src/```

│   ├── app.module.ts           # Módulo principal

│   ├── main.ts                 # Ponto de entrada da aplicação## Run tests

│   ├── city/                   # Módulo de cidades

│   │   ├── controller/```bash

│   │   ├── service/# unit tests

│   │   ├── repositories/$ npm run test

│   │   ├── prisma/

│   │   └── dtos/# e2e tests

│   ├── continent/              # Módulo de continentes$ npm run test:e2e

│   ├── country/                # Módulo de países

│   ├── database/               # Configuração Prisma# test coverage

│   │   ├── prisma.module.ts$ npm run test:cov

│   │   └── prisma.service.ts```

│   └── seeds/                  # Scripts de população do banco

│       ├── seed-continent.ts## Deployment

│       ├── seed-country.ts

│       └── seed-city-manual.tsWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

└── generated/prisma/           # Cliente Prisma gerado

```If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:



## 🔧 Instalação```bash

$ npm install -g @nestjs/mau

### 1. Pré-requisitos$ mau deploy

```

- Node.js 18+

- PostgreSQL 14+With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

- npm ou yarn

## Resources

### 2. Instalar dependências

Check out a few resources that may come in handy when working with NestJS:

```bash

npm install- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

```- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

### 3. Configurar variáveis de ambiente- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

Crie um arquivo `.env` na raiz do projeto:- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

```env- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

DATABASE_USER=seu_usuario

DATABASE_PASSWORD=sua_senha## Support

DATABASE_NAME=geohub

DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}?schema=public"Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

FRONTEND_URL=http://localhost:5173

REST_COUNTRIES_API_URL=https://restcountries.com/v3.1## Stay in touch

```

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

### 4. Criar e configurar banco de dados- Website - [https://nestjs.com](https://nestjs.com/)

- Twitter - [@nestframework](https://twitter.com/nestframework)

```bash

npx prisma migrate dev## License

npx prisma studio

```Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).



### 5. Popular banco de dados## Prisma config



Execute os seeds na ordem:Create a new migration (development)



```bash```bash

npm run seed:continentnpx prisma migrate dev

npm run seed:country```

npm run seed:city

```Generate Prisma Client



### 6. Iniciar servidor```bash

npx prisma generate

```bash```

npm run start:dev

```Synchronize migrations with the database (production or empty database)



O servidor estará disponível em: `http://localhost:3000````bash

npx prisma migrate deploy

## 🗄️ Modelo de Dados```



### Continent (Continente)Run Prisma Studio (interface to explore and test the database)

```prisma

model Continent {```bash

  id          Int       @id @default(autoincrement())npx prisma studio

  con_name    String    @unique```

  con_description String?

  countries   Country[]Prettier

}

``````bash

npx prettier . --write

### Country (País)```

```prisma

model Country {

  id              Int       @id @default(autoincrement())Seed

  cou_name        String    @uniquenpm run seed:continent

  cou_population  BigIntnpm run seed:country
  cou_official_language String
  cou_currency    String
  cou_flag        String
  cou_created_at  DateTime  @default(now())
  cou_updated_at  DateTime  @updatedAt
  continentId     Int
  continent       Continent @relation(fields: [continentId], references: [id])
  cities          City[]
}
```

### City (Cidade)
```prisma
model City {
  id              Int      @id @default(autoincrement())
  cit_name        String
  cit_population  BigInt
  cit_latitude    Float
  cit_longitude   Float
  cit_created_at  DateTime @default(now())
  cit_updated_at  DateTime @updatedAt
  countryId       Int
  country         Country  @relation(fields: [countryId], references: [id])
}
```

## 🌐 Endpoints da API

### Continentes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/continent` | Listar todos os continentes |
| GET | `/continent/:id` | Buscar continente por ID |
| POST | `/continent` | Criar novo continente |
| PUT | `/continent/:id` | Atualizar continente |
| DELETE | `/continent/:id` | Deletar continente |

**Exemplo POST /continent:**
```json
{
  "con_name": "Antarctica",
  "con_description": "The southernmost continent"
}
```

### Países

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/country` | Listar todos os países |
| GET | `/country?top5=true` | Top 5 países por população |
| GET | `/country/:id` | Buscar país por ID |
| GET | `/country/stats/total-country` | Total de países registrados |
| GET | `/country/stats/total-population` | População total |
| POST | `/country` | Criar novo país |
| PUT | `/country/:id` | Atualizar país |
| DELETE | `/country/:id` | Deletar país |

**Exemplo POST /country:**
```json
{
  "cou_name": "Brazil",
  "cou_population": 215313498,
  "cou_official_language": "Portuguese",
  "cou_currency": "Brazilian Real",
  "cou_flag": "🇧🇷",
  "continentId": 1
}
```

**Resposta GET /country/stats/total-country:**
```json
{
  "total": 195,
  "updatedAt": "2024-11-07T20:30:00.000Z"
}
```

### Cidades

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/city` | Listar todas as cidades |
| GET | `/city?countryId=1` | Filtrar por país |
| GET | `/city?continentId=2` | Filtrar por continente |
| GET | `/city/:id` | Buscar cidade por ID |
| GET | `/city/stats/total-city` | Total de cidades registradas |
| POST | `/city` | Criar nova cidade |
| PUT | `/city/:id` | Atualizar cidade |
| DELETE | `/city/:id` | Deletar cidade |

**Exemplo POST /city:**
```json
{
  "cit_name": "São Paulo",
  "cit_population": 12300000,
  "cit_latitude": -23.5505,
  "cit_longitude": -46.6333,
  "countryId": 1
}
```

**Filtros de consulta:**
- `countryId`: Filtra cidades por país específico
- `continentId`: Filtra cidades por continente específico
- **Nota**: Os filtros são mutuamente exclusivos (usar apenas um por vez)

## 🔄 Seeds

### seed-continent.ts
Popula os 7 continentes principais:
- Africa
- Antarctica
- Asia
- Europe
- North America
- Oceania
- South America

### seed-country.ts
Integra com a **REST Countries API** para importar:
- Nome oficial do país
- População
- Idioma oficial
- Moeda
- Bandeira (emoji)
- Região (continente)

### seed-city-manual.ts
Popula 100 principais cidades do mundo com:
- Nome da cidade
- País de origem
- População
- Coordenadas (latitude/longitude)

## 📊 Padrões de Arquitetura

### Repository Pattern
Cada módulo utiliza o padrão Repository para abstrair a lógica de acesso aos dados:

```typescript
abstract class CityRepository {
  abstract findAll(): Promise<City[]>;
  abstract findById(id: number): Promise<City>;
  abstract create(data: CreateCityDto): Promise<City>;
}

class PrismaCityRepository implements CityRepository {
  constructor(private prisma: PrismaService) {}
}
```

### DTOs (Data Transfer Objects)
Validação de dados com class-validator:

```typescript
export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  cit_name: string;

  @IsNumber()
  @IsPositive()
  cit_population: number;

  @IsNumber()
  countryId: number;
}
```

## 🧪 Scripts Disponíveis

```bash
npm run start:dev         # Servidor com hot-reload
npm run build             # Compilar para produção
npm run start:prod        # Rodar build de produção
npm run seed:continent    # Popular continentes
npm run seed:country      # Popular países (REST Countries)
npm run seed:city         # Popular cidades
npx prisma studio         # Interface gráfica do banco
npx prisma migrate dev    # Criar nova migration
npx prisma generate       # Gerar Prisma Client
npm run test              # Rodar testes unitários
npm run test:e2e          # Rodar testes E2E
npm run test:cov          # Coverage dos testes
npm run lint              # Verificar código
npm run format            # Formatar código
```

## 🔐 CORS

CORS está configurado para aceitar requisições do frontend:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
});
```

## 📝 Notas Importantes

1. **Ordem dos Seeds**: Execute sempre na ordem (continentes → países → cidades)
2. **REST Countries API**: O seed de países faz requisição HTTP externa
3. **Migrations**: Use `npx prisma migrate dev` para criar novas migrations
4. **Validação**: DTOs utilizam class-validator para validação automática
5. **Tratamento de Erros**: Filtros globais para exceções do Prisma

## 🐛 Troubleshooting

### Erro de conexão com o banco
```bash
sudo service postgresql status
npx prisma db push
```

### Erro nos seeds
```bash
npx prisma migrate reset
npm run seed:continent
npm run seed:country
npm run seed:city
```

### Prisma Client desatualizado
```bash
npx prisma generate
```

## 📚 Recursos

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [REST Countries API](https://restcountries.com/)

## 👤 Autor

**Victor Godoy**
- GitHub: [@victorrgodoy](https://github.com/victorrgodoy)
