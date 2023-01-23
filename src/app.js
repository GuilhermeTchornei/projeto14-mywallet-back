import express from 'express';
import cors from 'cors';
import transitionsRouter from './Routes/TransitionsRoutes.js';
import loginRouter from './Routes/LoginRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use([loginRouter, transitionsRouter])

const port = 5000;
app.listen(port, () => console.log('server connected'));