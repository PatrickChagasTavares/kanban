# Kanban API

esse backend tem como objetivo fornecer ações simples de um quadro kanban.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Ferramentas:

- [Docker](https://docs.docker.com/engine/install/)
- [Node 16](https://nodejs.org/en/download) ou
- [NVM](https://github.com/nvm-sh/nvm)

Instruções:

faça uma copia do arquivo `.env.example` e em seguida renomeie ele para somente `.env`, em seguida altere ou insira essas variaveis presentes nele:
```
<!-- Aqui você pode inserir um usuario e senha que será usado para login na rodar /login -->
AUTH_USER=
AUTH_PASS=

<!-- Aqui ficam as configs referente a secret para geração do jwt e o tempo de expiração -->
JWT_SECRET=
JWT_EXPIRATION=
```
obs.: Todas as envs são string exceto a `port`, caso tenha ficado com duvida sobre qual valor colocar na env `JWT_EXPIRATION`, recomendo dar uma olhada nesse [link](https://github.com/vercel/ms).

## 📦 Desenvolvimento

Alguns comandos importantes para rodar o projeto e validar:

- `make up`: Inicia o docker compose (db and admin).
- `yarn dev ou npm run dev`: inicia o projeto, ele é um Wrapper para o `tsc --project tsconfig.json && npm run build && node dist/index.js`.
- `yarn build ou npm run build`: build o projeto para javascript.
- `make down`: encerra o docker-compose (db and admin).

## 🗂 Arquitetura

### Descrição dos diretórios e arquivos mais importantes:

- `.env`: Nesse arquivo estão todas as variavel de ambiente necessarias para o projeto funcionar corretamente.
- `./src/index.ts`: O codígo que inicia a aplicação.
- `./src/@type`: Nesse diretorio temos os alguns tipos globais, mais expecificamente os `process.env.d.ts`, necessario para sabermos os tipos das nossas variaveis de ambiente.
- `./src/controller`: Nesse diretorio temos todas as regras da aplicação. cada arquivo aqui dentro é como um modulo, e pode crescer para uma sub-pasta se for necessario.
- `./src/middlewares`: Aqui temos os middlewares da aplicação, sejá de log, erro ou authorização.
- `./src/models`: Este diretório possui todos os arquivos de modelos globais do projeto.
- `./src/repositories`: Esse diretório possui todos os arquivos relacionado a banco ou cache.
- `./src/routes`: Esse diretório possui o registro todas as rotas existentes.


## 🛠️ Construído com

- [Express](https://expressjs.com/) - Framework Web
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Lib para criar e validar JWT
- [sequelize](https://sequelize.org/) - ORM
- [uuid](https://github.com/uuidjs/uuid) - Gerador de UUID
- [postgresql / pg](https://www.npmjs.com/package/pg) - database e client
