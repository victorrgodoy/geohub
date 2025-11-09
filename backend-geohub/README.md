# GeoHub Backend

<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

API REST para gerenciamento de dados geográficos com integração à REST Countries API.</p>

## Boas Práticas Utilizadas no Projeto

- **Separação de camadas:** O projeto segue a arquitetura de camadas, separando responsabilidades em Repository, Service e Controller.
- **Módulos separados:** Cada domínio (ex: user, country, city, continent, auth) possui seu próprio módulo, facilitando manutenção e escalabilidade.
- **Seeds implementados:** Scripts de seed para popular o banco de dados em ambiente de desenvolvimento, incluindo usuários, países, cidades e continentes.
- **Validação e DTOs:** Uso de DTOs para validação e transferência de dados entre camadas.

## Tecnologias

- **NestJS** - Framework Node.js progressivo

- **Prisma ORM** - Type-safe database client

- **PostgreSQL** - Banco de dados relacional

- **TypeScript** - Superset JavaScript com tipagem estática

## Estrutura do Projeto

````bash

├── prisma/

│   ├── schema.prisma           # Schema do banco de dados

│   └── migrations/             # Histórico de migrations

├── src/```

│   ├── app.module.ts           # Módulo principal

│   ├── main.ts                 # Ponto de entrada da aplicação

│   ├── city/                   # Módulo de cidades

│   │   ├── controller/

│   │   ├── service

│   │   ├── repositories/

│   │   ├── prisma/

│   │   └── dtos/

│   ├── continent/              # Módulo de continente

│   ├── country/                # Módulo de países

│   ├── database/               # Configuração Prisma

│   │   ├── prisma.module.ts

│   │   └── prisma.service.ts

│   └── seeds/                  # Scripts de população do banco

│       ├── seed-continent.ts

│       ├── seed-country.ts

│       ├── seed-city-manual.ts

````

## Recursos

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [REST Countries API](https://restcountries.com/)
