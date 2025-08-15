# JornadaEnem API

Uma API REST desenvolvida com NestJS para gerenciamento de usuários com autenticação JWT.

## 🛠️ Tecnologias Utilizadas

- NestJS
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- Swagger para documentação
- Docker para banco de dados

## 📋 Pré-requisitos

- Node.js
- Docker e Docker Compose
- NPM 

## 🚀 Como executar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/josevitorrodriguess/jornadaEnem-disafio.git
cd jornadaEnem-disafio
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
JWT_SECRET="sua_chave_secreta"
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_PORT=5432
JWT_SECRET=secret
PORT=3000
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate deploy
```

6. Inicie a aplicação:
```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

## 📚 Documentação

A documentação da API está disponível através do Swagger UI em:
`http://localhost:3000/api`

## 🔑 Endpoints Principais

### Autenticação
- POST `/auth/register` - Registro de novo usuário
- POST `/auth/login` - Login de usuário

### Usuários
- GET `/users` - Listar todos os usuários (requer autenticação)
- GET `/users/:id` - Buscar usuário por ID (requer autenticação)
- PATCH `/users/:id` - Atualizar usuário (requer autenticação)
- DELETE `/users/:id` - Deletar usuário (requer autenticação)

## ⚙️ Scripts Disponíveis

- `npm run start:dev` - Inicia a aplicação em modo de desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia a aplicação em modo de produção

