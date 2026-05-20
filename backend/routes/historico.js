import express from 'express';
import historicoControllers from '../controllers/historico.js';

const routerHistorico = express.Router();

routerHistorico.get('/historico/usuario/:userId', historicoControllers.getRegistrosUsuario);

routerHistorico.get('/historico/usuario/:userId/progresso', historicoControllers.getProgressoUsuario);

routerHistorico.post('/historico/usuario/:userId/exercicio', historicoControllers.salvarExercicio);

routerHistorico.post('/historico/usuario/:userId/finalizar', historicoControllers.finalizarTreino);

export default routerHistorico;
