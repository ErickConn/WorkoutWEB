import express from 'express';
import exerciciosControllers from '../controllers/exercicios.js';
import authenticateToken from '../middlewares/verificarToken.js';

const routerExercicios = express.Router();

// Rotas públicas (Qualquer pessoa ou visitante pode ver a biblioteca)
routerExercicios.get('/exercicios', exerciciosControllers.getAllExercicios);
routerExercicios.get('/exercicios/:id', exerciciosControllers.getExercicio);
routerExercicios.get('/treinos/:treinoId/exercicios', exerciciosControllers.getExerciciosTreino);

// Rotas protegidas (O usuário PRECISA estar logado para criar, editar ou desativar)
routerExercicios.post('/exercicios', authenticateToken, exerciciosControllers.createExercicio);
routerExercicios.patch('/exercicios/:id', authenticateToken, exerciciosControllers.updateExercicio);
routerExercicios.delete('/exercicios/:id', authenticateToken, exerciciosControllers.deleteExercicio);

export default routerExercicios;