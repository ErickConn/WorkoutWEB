import express from 'express';
import treinosControllers from '../controllers/treinos.js';
import treinosMiddlewares from '../middlewares/validarTreinos.js';

const routerTreinos = express.Router();

routerTreinos.get('/treinos', treinosControllers.getAllTreinos);
routerTreinos.get('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosControllers.getTreino);
routerTreinos.post('/treinos', treinosMiddlewares.validateEmptyBody, treinosMiddlewares.validateTreinoStructure, treinosControllers.createTreino);
routerTreinos.patch('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosMiddlewares.validateEmptyBody, treinosMiddlewares.validateTreinoStructure, treinosControllers.patchTreino);
routerTreinos.put('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosMiddlewares.validateEmptyBody, treinosMiddlewares.validateTreinoStructure, treinosControllers.putTreino);
routerTreinos.delete('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosControllers.deleteTreino);

export default routerTreinos;
