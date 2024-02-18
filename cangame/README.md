para criar o diretorio e com o prejeto e database mysql
### npx typeorm init --name cangame --database mysql

remover o mysql
### npm remove mysql

instalar o express, cors, express-async-errors e mysql2 
### npm install express cors express-async-errors mysql2

instalar as dependencias ligadas ao typescript
### npm install @types/express @types/cors ts-node-dev -D

instalar as dependencias para criptografar senha e gerar token
### npm install bcrypt jsonwebtoken

Rodar o projeto para teste
### npm rum dev

Criar a migration das Tabelas
### npm run typeorm migration:create src/database/migrations/CreateUserTable
### npm run typeorm migration:create src/database/migrations/CreateContratoTable
### npm run typeorm migration:create src/database/migrations/CreateGestorTable
### npm run typeorm migration:create src/database/migrations/CreateEnderecoTable
### npm run typeorm migration:create src/database/migrations/CreateTelefoneTable
### npm run typeorm migration:create src/database/migrations/CreateAdministradorTable
### npm run typeorm migration:create src/database/migrations/CreateLicencaTable


Rodar a migrations
### npm run typeorm -- -d ./src/database/data-source.ts migration:run
