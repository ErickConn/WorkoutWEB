import express from 'express';
import treinosControllers from '../controllers/treinos.js';
import treinosMiddlewares from '../middlewares/validarTreinos.js';

const routerTreinos = express.Router();

routerTreinos.get('/treinos', treinosControllers.getAllTreinos);
routerTreinos.get('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosControllers.getTreino);
routerTreinos.post('/treinos', treinosMiddlewares.validateEmptyBody, treinosControllers.createTreino);
routerTreinos.patch('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosMiddlewares.validateEmptyBody, treinosControllers.patchTreino);
routerTreinos.put('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosMiddlewares.validateEmptyBody, treinosControllers.putTreino);
routerTreinos.delete('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosControllers.deleteTreino);

export default routerTreinos;
