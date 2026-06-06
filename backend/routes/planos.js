import express from 'express';
import planosControllers from '../controllers/planos.js';
import planosMiddlewares from '../middlewares/validarPlanos.js';
import authenticateToken from '../middlewares/verificarToken.js';

const routerPlanos = express.Router();

routerPlanos.get('/planos', authenticateToken, planosControllers.getAllPlanos);

routerPlanos.get('/planos/:id', planosMiddlewares.validatePlanoId, planosControllers.getPlano);

routerPlanos.post('/planos', planosMiddlewares.validateEmptyBody, planosMiddlewares.validatePlanoStructure, planosMiddlewares.validatePlanoTitle, planosControllers.createPlano);

routerPlanos.patch('/planos/:id', authenticateToken, planosMiddlewares.validatePlanoId, planosMiddlewares.validatePlanoOwner, planosMiddlewares.validateEmptyBody, planosMiddlewares.validatePlanoStructure, planosControllers.patchPlano);

routerPlanos.put('/planos/:id', planosMiddlewares.validatePlanoId, planosMiddlewares.validateEmptyBody, planosMiddlewares.validatePlanoStructure, planosMiddlewares.validatePlanoTitle, planosControllers.putPlano);

routerPlanos.delete('/planos/:id', authenticateToken, planosMiddlewares.validatePlanoId, planosMiddlewares.validatePlanoOwner, planosControllers.deletePlano);

export default routerPlanos;