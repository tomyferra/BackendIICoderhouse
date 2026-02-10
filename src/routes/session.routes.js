import { Router } from 'express';
import { passportCall } from "../middlewares/passport/passport-call.js";
import { verifyRole } from "../middlewares/verify-role.js";
const router = Router();

router.get('/current', passportCall('jwt'), verifyRole('admin'), (req, res) => {
    res.send(req.user)
})


export default router;