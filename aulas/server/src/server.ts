import express from "express";
import path from "path";
import cors from "cors";
import 'express-async-errors';

//conexão com banco de dados
import './database/connection';

import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();

app.use(cors());

//para entender requisições do tipo json
app.use(express.json());

// exportando as rotas
app.use(routes);

//para acessar arquivos estáticos da api
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//verifica a existência de erro na api
app.use(errorHandler);

//porta de acesso da api;
app.listen(3333);