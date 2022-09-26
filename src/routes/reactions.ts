import { Router } from "express";
import controller from "../controllers/reactions";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.post('/add', verifyToken, controller.add);
router.post('/update', verifyToken, controller.update);
router.post('/delete', verifyToken, controller.remove);
export default router;