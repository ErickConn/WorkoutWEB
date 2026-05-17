import express from 'express';
import exerciciosControllers from '../controllers/exercicios.js';

const routerExercicios = express.Router();

routerExercicios.get('/exercicios', exerciciosControllers.getAllExercicios);

routerExercicios.get('/exercicios/:id', exerciciosControllers.getExercicio);

routerExercicios.post('/exercicios', exerciciosControllers.createExercicio);

routerExercicios.patch('/exercicios/:id', exerciciosControllers.updateExercicio);

routerExercicios.delete('/exercicios/:id', exerciciosControllers.deleteExercicio);

export default routerExercicios;