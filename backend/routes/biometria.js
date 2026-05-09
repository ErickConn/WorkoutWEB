import express from 'express';
import biometriaControllers from '../controllers/biometria.js';

const routerBiometria = express.Router();

routerBiometria.get('/biometria', (req, res) => biometriaControllers.getAllBiometria(req, res));

routerBiometria.get('/biometria/:id', (req, res) => biometriaControllers.getBiometria(req, res));

routerBiometria.post('/biometria', (req, res) => biometriaControllers.createBiometria(req, res));

routerBiometria.patch('/biometria/:id', (req, res) => biometriaControllers.patchBiometria(req, res));

routerBiometria.put('/biometria/:id', (req, res) => biometriaControllers.putBiometria(req, res));

routerBiometria.delete('/biometria/:id', (req, res) => biometriaControllers.deleteBiometria(req, res));

export default routerBiometria; 