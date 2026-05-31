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
    origin: (origin, callback) => {
        // Permite: sem origin (curl/Postman), localhost, e qualquer *.vercel.app
        if (
            !origin ||
            /^http:\/\/localhost(:\d+)?$/.test(origin) ||
            /^https:\/\/[\w-]+\.vercel\.app$/.test(origin)
        ) {
            callback(null, true);
        } else {
            callback(new Error(`CORS bloqueado para origem: ${origin}`));
        }
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
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