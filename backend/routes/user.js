import express from 'express';
import userControllers from '../controllers/user.js';
import authenticateToken from '../middlewares/verificarToken.js';
import autorizar from '../middlewares/autorizar.js';
import userMiddlewares from '../middlewares/validarUsuario.js';
import { loginLimiter } from '../middlewares/rateLimiter.js';

const routerUser = express.Router();

// Rotas do Usuário logado (Devem vir antes de /:id para evitar colisões de rotas)
routerUser.get('/user/me', authenticateToken, (req, res) => userControllers.getMe(req, res));
routerUser.get('/users/me', authenticateToken, (req, res) => userControllers.getMe(req, res));

// Rota pública para obter informações não sensíveis de um usuário (ex: nome)
routerUser.get('/public/user/:id', (req, res) => userControllers.getPublicUser(req, res));

// Apenas administradores podem ver a lista de todos os usuários
routerUser.get('/user', authenticateToken, autorizar('admin'), (req, res) => userControllers.getAllUser(req, res));
routerUser.get('/users', authenticateToken, autorizar('admin'), (req, res) => userControllers.getAllUser(req, res));

routerUser.get('/user/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, (req, res) => userControllers.getUser(req, res));
routerUser.get('/users/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, (req, res) => userControllers.getUser(req, res));

routerUser.post('/user', userMiddlewares.validateEmptyBody, userMiddlewares.validateUserStructure, (req, res) => userControllers.createUser(req, res));
routerUser.post('/users', userMiddlewares.validateEmptyBody, userMiddlewares.validateUserStructure, (req, res) => userControllers.createUser(req, res));

routerUser.patch('/user/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, userMiddlewares.validateEmptyBody, userMiddlewares.validateUserStructure, (req, res) => userControllers.updateUser(req, res));
routerUser.patch('/users/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, userMiddlewares.validateEmptyBody, userMiddlewares.validateUserStructure, (req, res) => userControllers.updateUser(req, res));

routerUser.put('/user/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, userMiddlewares.validateEmptyBody, userMiddlewares.validateUserStructure, (req, res) => userControllers.updateUser(req, res));
routerUser.put('/users/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, userMiddlewares.validateEmptyBody, userMiddlewares.validateUserStructure, (req, res) => userControllers.updateUser(req, res));

routerUser.delete('/user/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, (req, res) => userControllers.deleteUser(req, res));
routerUser.delete('/users/:id', authenticateToken, userMiddlewares.validateUserId, userMiddlewares.validateUserOwner, (req, res) => userControllers.deleteUser(req, res));

// ── Rotas exclusivas de administrador ──────────────────────────
routerUser.patch('/admin/user/:id', authenticateToken, autorizar('admin'), userMiddlewares.validateUserId, (req, res) => userControllers.adminUpdateUser(req, res));
routerUser.delete('/admin/user/:id', authenticateToken, autorizar('admin'), userMiddlewares.validateUserId, (req, res) => userControllers.adminDeleteUser(req, res));

routerUser.post('/login', loginLimiter, (req, res) => userControllers.loginUser(req, res));
routerUser.post('/logout', (req, res) => userControllers.logoutUser(req, res));

export default routerUser;