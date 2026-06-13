import express from 'express';
import historicoControllers from '../controllers/historico.js';
import authenticateToken from '../middlewares/verificarToken.js';

const routerHistorico = express.Router();

// Todas as rotas de histórico exigem autenticação, pois lidam com dados sensíveis do usuário
routerHistorico.use(authenticateToken);

routerHistorico.get('/historico/usuario/:userId', historicoControllers.getRegistrosUsuario);

routerHistorico.get('/historico/usuario/:userId/progresso', historicoControllers.getProgressoUsuario);

routerHistorico.post('/historico/usuario/:userId/exercicio', historicoControllers.salvarExercicio);

routerHistorico.post('/historico/usuario/:userId/finalizar', historicoControllers.finalizarTreino);

export default routerHistorico;
