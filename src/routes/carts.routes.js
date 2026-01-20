import { Router } from 'express';
import Carts from "../models/carts.models.js";

const router = Router();

router.get('/', async (req, res) => {
    const allCarts = await Carts.find();
    res.send(allCarts);
});


export default router;