import express from 'express';
import cors from 'cors';
import transitionsRouter from './Routes/TransitionsRoutes.js';
import loginRouter from './Routes/LoginRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use([loginRouter, transitionsRouter])

app.listen(process.env.PORT, () => console.log('server connected'));