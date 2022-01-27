import express from "express";
import multer from "multer";
import multerConfig from './config/multer';

//importação de controllers
import OrphanagesController from "./controllers/OrphanagesController";

const routes = express.Router();
const upload = multer(multerConfig);

//instâncias de controllers
const orphanagesController = new OrphanagesController();

// rota para criar orfanato
routes.post('/orphanages', upload.array('images'), orphanagesController.create);

// lista todos os orfanatos
routes.get('/orphanages', orphanagesController.index);

// detalhes de um orfanato
routes.get('/orphanages/:id', orphanagesController.show);

export default routes;