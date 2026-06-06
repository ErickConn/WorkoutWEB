import express from 'express';
import planosControllers from '../controllers/planos.js';
import planosMiddlewares from '../middlewares/validarPlanos.js';
import authenticateToken from '../middlewares/verificarToken.js';

const routerPlanos = express.Router();

routerPlanos.get('/planos', authenticateToken, planosControllers.getAllPlanos);

// Fix #3: GET/:id agora exige autenticação para impedir acesso a planos personalizados alheios
routerPlanos.get('/planos/:id', authenticateToken, planosMiddlewares.validatePlanoId, planosControllers.getPlano);

// Fix #1: POST agora exige autenticação — o userId do criador vem do token, não do body
routerPlanos.post('/planos', authenticateToken, planosMiddlewares.validateEmptyBody, planosMiddlewares.validatePlanoStructure, planosMiddlewares.validatePlanoTitle, planosControllers.createPlano);

routerPlanos.patch('/planos/:id', authenticateToken, planosMiddlewares.validatePlanoId, planosMiddlewares.validatePlanoOwner, planosMiddlewares.validateEmptyBody, planosMiddlewares.validatePlanoStructure, planosControllers.patchPlano);

// Fix #5: PUT agora inclui validatePlanoOwner
routerPlanos.put('/planos/:id', authenticateToken, planosMiddlewares.validatePlanoId, planosMiddlewares.validatePlanoOwner, planosMiddlewares.validateEmptyBody, planosMiddlewares.validatePlanoStructure, planosControllers.putPlano);

routerPlanos.delete('/planos/:id', authenticateToken, planosMiddlewares.validatePlanoId, planosMiddlewares.validatePlanoOwner, planosControllers.deletePlano);

// Fix #10: Endpoint atômico para remover um treino por dia sem depender do estado do frontend
routerPlanos.delete('/planos/:id/treinos/:dia', authenticateToken, planosMiddlewares.validatePlanoId, planosMiddlewares.validatePlanoOwner, planosControllers.removerTreinoDaRotina);

export default routerPlanos;