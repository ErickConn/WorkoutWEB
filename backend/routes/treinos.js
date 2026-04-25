import express from 'express';
import treinosControllers from '../controllers/treinos';

const routerTreinos = express.Router();

routerTreinos.get('/treinos', (req, res) => treinosControllers.getAllTreinos(req, res));

routerTreinos.get('/treinos/:id', (req, res) => treinosControllers.getTreino(req, res));

routerTreinos.post('/treinos', (req, res) => treinosControllers.createTreino(req, res));

routerTreinos.patch('/treinos/:id', (req, res) => treinosControllers.patchTreino(req, res));

routerTreinos.put('/treinos/:id', (req, res) => treinosControllers.putTreino(req, res));

routerTreinos.delete('/treinos/:id', (req, res) => treinosControllers.deleteTreino(req, res));

export default routerTreinos;