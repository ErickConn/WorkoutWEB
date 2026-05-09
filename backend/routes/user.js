import express from 'express';
import userControllers from '../controllers/user.js';

const routerUser = express.Router();

routerUser.get('/user', (req, res) => userControllers.getAllUser(req, res));
routerUser.get('/users', (req, res) => userControllers.getAllUser(req, res));

routerUser.get('/user/:id', (req, res) => userControllers.getUser(req, res));
routerUser.get('/users/:id', (req, res) => userControllers.getUser(req, res));

routerUser.post('/user', (req, res) => userControllers.createUser(req, res));
routerUser.post('/users', (req, res) => userControllers.createUser(req, res));

routerUser.patch('/user/:id', (req, res) => userControllers.updateUser(req, res));
routerUser.patch('/users/:id', (req, res) => userControllers.updateUser(req, res));

routerUser.put('/user/:id', (req, res) => userControllers.updateUser(req, res));
routerUser.put('/users/:id', (req, res) => userControllers.updateUser(req, res));

routerUser.delete('/user/:id', (req, res) => userControllers.deleteUser(req, res));
routerUser.delete('/users/:id', (req, res) => userControllers.deleteUser(req, res));

routerUser.post('/login', (req, res) => userControllers.loginUser(req, res));

export default routerUser;