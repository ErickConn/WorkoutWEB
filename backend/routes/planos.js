import express from 'express';
import planosControllers from '../controllers/planos.js';
import planosMiddlewares from '../middlewares/validarPlanos.js';

const routerPlanos = express.Router();

routerPlanos.get('/planos', planosControllers.getAllPlanos);

routerPlanos.get('/planos/:id', planosMiddlewares.validatePlanoId, planosControllers.getPlano);

routerPlanos.post('/planos', planosMiddlewares.validateEmptyBody, planosMiddlewares.normalizeUsers, planosMiddlewares.validatePlanoStructure, planosMiddlewares.validatePlanoTitle, planosControllers.createPlano);

routerPlanos.patch('/planos/:id', planosMiddlewares.validatePlanoId, planosMiddlewares.validateEmptyBody, planosMiddlewares.normalizeUsers, planosMiddlewares.validatePlanoStructure, planosControllers.patchPlano);

routerPlanos.put('/planos/:id', planosMiddlewares.validatePlanoId, planosMiddlewares.validateEmptyBody, planosMiddlewares.normalizeUsers, planosMiddlewares.validatePlanoStructure, planosMiddlewares.validatePlanoTitle, planosControllers.putPlano);

routerPlanos.delete('/planos/:id', planosMiddlewares.validatePlanoId, planosControllers.deletePlano);

export default routerPlanos;