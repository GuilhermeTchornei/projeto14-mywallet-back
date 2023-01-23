import { Router } from "express";
import { SignIn, SignUp } from '../Controllers/Login.js';
import { authSchema } from "../Middleware/AuthSchema.js";
import userSchema from "../Model/LoginSchema.js";

const loginRouter = Router();

loginRouter.post('/sign-in', SignIn);

loginRouter.post('/sign-up', authSchema(userSchema), SignUp);

export default loginRouter;