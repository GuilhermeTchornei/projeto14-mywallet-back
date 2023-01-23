import { Router } from "express";
import { getTransitions, postTransition } from "../Controllers/Transitions.js";
import { authSchema } from "../Middleware/AuthSchema.js";
import { authToken } from "../Middleware/AuthToken.js";
import transitionSchema from "../Model/TransitionsSchema.js";

const transitionsRouter = Router();

transitionsRouter.use(authToken);

transitionsRouter.get('/transitions', getTransitions);

transitionsRouter.post('/transitions', authSchema(transitionSchema), postTransition);

export default transitionsRouter;