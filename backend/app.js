import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './bd/index.js';
import routerPlanos from './routes/planos.js';
import routerTreinos from './routes/treinos.js';
import routerUser from './routes/user.js';
import routerBiometria from './routes/biometria.js';
import router from './routes/index.js';
import authenticateToken from './middlewares/verificarToken.js';
import routerExercicios from './routes/exercicios.js';
import routerProgresso from './routes/progresso.js';
import routerHistorico from './routes/historico.js';

const app = express();
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://workout-web-three.vercel.app'
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(routerUser);
app.use(authenticateToken);
app.use(routerPlanos);
app.use(routerTreinos);
app.use(routerBiometria);
app.use(routerExercicios);
app.use(routerProgresso);
app.use(routerHistorico);
app.use(router);

export default app;