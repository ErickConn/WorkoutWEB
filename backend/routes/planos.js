import express from 'express';
import planosControllers from '../controllers/planos.js';
import planosMiddleware from '../middlewares/validarPlanos.js';

const routerPlanos = express.Router();

routerPlanos.get('/planos', planosControllers.getAllPlanos);

routerPlanos.get('/planos/:id', planosControllers.getPlano);

routerPlanos.post('/planos', planosMiddleware.validateEmptyBody, planosMiddleware.validatePlanoStructure, planosMiddleware.validatePlanoTitle, planosControllers.createPlano);

routerPlanos.patch('/planos/:id', planosMiddleware.validateEmptyBody, planosMiddleware.validatePlanoStructure, planosControllers.patchPlano);

routerPlanos.put('/planos/:id', planosMiddleware.validateEmptyBody, planosMiddleware.validatePlanoStructure, planosMiddleware.validatePlanoTitle, planosControllers.putPlano);

routerPlanos.delete('/planos/:id', planosControllers.deletePlano);

export default routerPlanos;