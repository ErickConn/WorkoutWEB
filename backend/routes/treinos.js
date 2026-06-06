import express from 'express';
import treinosControllers from '../controllers/treinos.js';
import treinosMiddlewares from '../middlewares/validarTreinos.js';
import authenticateToken from '../middlewares/verificarToken.js';

const routerTreinos = express.Router();

// GET: acessos de leitura mantidos sem auth (treinos são geralmente vinculados a planos já filtrados)
routerTreinos.get('/treinos', treinosControllers.getAllTreinos);
routerTreinos.get('/treinos/:id', treinosMiddlewares.validateTreinoId, treinosControllers.getTreino);

// Fix #2: rotas de escrita agora exigem autenticação
routerTreinos.post('/treinos', authenticateToken, treinosMiddlewares.validateEmptyBody, treinosMiddlewares.validateTreinoStructure, treinosControllers.createTreino);
routerTreinos.patch('/treinos/:id', authenticateToken, treinosMiddlewares.validateTreinoId, treinosMiddlewares.validateEmptyBody, treinosMiddlewares.validateTreinoStructure, treinosControllers.patchTreino);
routerTreinos.put('/treinos/:id', authenticateToken, treinosMiddlewares.validateTreinoId, treinosMiddlewares.validateEmptyBody, treinosMiddlewares.validateTreinoStructure, treinosControllers.putTreino);
routerTreinos.delete('/treinos/:id', authenticateToken, treinosMiddlewares.validateTreinoId, treinosControllers.deleteTreino);

export default routerTreinos;