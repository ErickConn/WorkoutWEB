import express from 'express';
import cors from 'cors';
import './bd/index.js';
import routerPlanos from './routes/planos.js';
import routerTreinos from './routes/treinos.js';
import routerUser from './routes/user.js';
import routerBiometria from './routes/biometria.js';
import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routerPlanos);
app.use(routerTreinos);
app.use(routerUser);
app.use(routerBiometria);
app.use(router);

export default app;