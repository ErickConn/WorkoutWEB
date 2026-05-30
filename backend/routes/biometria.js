import express from 'express';
import biometriaControllers from '../controllers/biometria.js';
import biometriaMiddlewares from '../middlewares/validarBiometria.js';

const routerBiometria = express.Router();

routerBiometria.get('/biometria', (req, res) => biometriaControllers.getAllBiometria(req, res));

routerBiometria.get('/biometria/:id', biometriaMiddlewares.validateBiometriaId, biometriaMiddlewares.validateBiometriaOwner, (req, res) => biometriaControllers.getBiometria(req, res));

routerBiometria.post('/biometria', biometriaMiddlewares.validateEmptyBody, biometriaMiddlewares.validateBiometriaStructure, biometriaMiddlewares.validateBiometriaOwnerOnCreate, (req, res) => biometriaControllers.createBiometria(req, res));

routerBiometria.patch('/biometria/:id', biometriaMiddlewares.validateBiometriaId, biometriaMiddlewares.validateEmptyBody, biometriaMiddlewares.validateBiometriaStructure, biometriaMiddlewares.validateBiometriaOwner, (req, res) => biometriaControllers.patchBiometria(req, res));

routerBiometria.put('/biometria/:id', biometriaMiddlewares.validateBiometriaId, biometriaMiddlewares.validateEmptyBody, biometriaMiddlewares.validateBiometriaStructure, biometriaMiddlewares.validateBiometriaOwner, (req, res) => biometriaControllers.putBiometria(req, res));

routerBiometria.delete('/biometria/:id', biometriaMiddlewares.validateBiometriaId, biometriaMiddlewares.validateBiometriaOwner, (req, res) => biometriaControllers.deleteBiometria(req, res));

export default routerBiometria; 