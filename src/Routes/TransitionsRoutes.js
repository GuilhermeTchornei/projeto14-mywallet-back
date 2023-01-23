import { Router } from "express";
import { getTransitions, postTransition } from "../Controllers/Transitions.js";

const transitionsRouter = Router();

transitionsRouter.get('/transitions', getTransitions);

transitionsRouter.post('/transitions', postTransition);

export default transitionsRouter;