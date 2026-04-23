import express from 'express';

const routerPlanos = express.Router();

routerPlanos.get('/planos', (req, res) => res.json({ message: 'Planos rodando' }));

export default routerPlanos;