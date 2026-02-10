import { Router } from "express";

import userRouter from './user.routes.js';
import cartRouter from './carts.routes.js';
import sessionRouter from './session.routes.js';

const router = Router();


router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/sessions', sessionRouter);



export default router;