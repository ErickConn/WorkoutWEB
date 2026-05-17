import express from 'express';
import userControllers from '../controllers/user.js';
import authenticateToken from '../middlewares/validarUsuario.js';

const routerUser = express.Router();

routerUser.get('/user', authenticateToken, (req, res) => userControllers.getAllUser(req, res));
routerUser.get('/users', authenticateToken, (req, res) => userControllers.getAllUser(req, res));

routerUser.get('/user/:id', authenticateToken, (req, res) => userControllers.getUser(req, res));
routerUser.get('/users/:id', authenticateToken, (req, res) => userControllers.getUser(req, res));

routerUser.post('/user', (req, res) => userControllers.createUser(req, res));
routerUser.post('/users', (req, res) => userControllers.createUser(req, res));

routerUser.patch('/user/:id', authenticateToken, (req, res) => userControllers.updateUser(req, res));
routerUser.patch('/users/:id', authenticateToken, (req, res) => userControllers.updateUser(req, res));

routerUser.put('/user/:id', authenticateToken, (req, res) => userControllers.updateUser(req, res));
routerUser.put('/users/:id', authenticateToken, (req, res) => userControllers.updateUser(req, res));

routerUser.delete('/user/:id', authenticateToken, (req, res) => userControllers.deleteUser(req, res));
routerUser.delete('/users/:id', authenticateToken, (req, res) => userControllers.deleteUser(req, res));

routerUser.post('/login', (req, res) => userControllers.loginUser(req, res));
routerUser.post('/logout', (req, res) => userControllers.logoutUser(req, res));

export default routerUser;