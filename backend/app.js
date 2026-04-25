import express from 'express';
import cors from 'cors';
import './bd/index.js';
import routerPlanos from './routes/planos.js';
import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routerPlanos);
app.use(router);

export default app;