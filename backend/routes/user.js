import express from 'express';
import userControllers from '../controllers/user.js';

const routerUser = express.Router();

routerUser.get('/user', (req, res) => userControllers.getAllUser(req, res));

routerUser.get('/user/:id', (req, res) => userControllers.getUser(req, res));

routerUser.post('/user', (req, res) => userControllers.createUser(req, res));

routerUser.patch('/user/:id', (req, res) => userControllers.patchUser(req, res));

routerUser.put('/user/:id', (req, res) => userControllers.putUser(req, res));

routerUser.delete('/user/:id', (req, res) => userControllers.deleteUser(req, res));

routerUser.post('/login', (req, res) => userControllers.loginUser(req, res));

export default routerUser;