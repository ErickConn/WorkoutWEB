import express from 'express';
import planosControllers from '../controllers/planos.js';

const routerPlanos = express.Router();

routerPlanos.get('/planos', (req, res) => planosControllers.getAllPlanos(req, res));

routerPlanos.get('/planos/:id', (req, res) => planosControllers.getPlano(req, res));

routerPlanos.post('/planos', (req, res) => planosControllers.createPlano(req, res));

routerPlanos.patch('/planos/:id', (req, res) => planosControllers.patchPlano(req, res));

routerPlanos.put('/planos/:id', (req, res) => planosControllers.putPlano(req, res));

routerPlanos.delete('/planos/:id', (req, res) => planosControllers.deletePlano(req, res));

export default routerPlanos;