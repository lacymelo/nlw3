##### COMANDOS PARA CRIAR O PROJETO #####

criar o arquivo package
### yarn init -y

Gerencia as requisições, rotas e URLs, entre outras funcionalidades
### yarn add express

Biblioteca de definição de tipos
### yarn add @types/express -D

Para instalar o typescript
### yarn add typescript -D

Biblioteca para o node entender código typescript, e executar como javascript
### yarn add ts-node -D

Criação de arquivo de configuração do typescript
### yarn tsc --init

Essa biblioteca verifica sempre que algo novo for salvo no código
### yarn add ts-node-dev -D

para executar o projeto
### yarn start

para escrever query do banco de dados
instalando as bibliotecas typeorm e sqlite3
### yarn add typeorm sqlite3

para criar as migrations
### yarn typeorm migration:create -n 'nome_tabela'

para executar as migrations
### yarn typeorm migration:run

para desfazer a criação da migration
### yarn typeorm migration:revert

para que o express entenda Multipart form data
### yarn add multer

dependência de desenvolvimento multer
### yarn add @types/multer -D

controla o acesso a api
### yarn add cors

dependência de desenvolvimento cors
### yarn add @types/cors -D

para verificar errors
### yarn add express-async-errors

validação de dados da requisição
### yarn add yup

trabalha com tempo real
<!-- ### yarn add socket.io -->