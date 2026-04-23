import express from 'express';

const routerTreinos = express.Router();

routerTreinos.get('/treinos', (req, res) => res.send('Treinos rodando'));

export default routerTreinos;