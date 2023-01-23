import { Router } from "express";
import { SignIn, SignUp } from '../Controllers/Login.js';

const loginRouter = Router();

loginRouter.post('/sign-in', SignIn);

loginRouter.post('/sign-up', SignUp);

export default loginRouter;