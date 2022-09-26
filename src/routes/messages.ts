import { Router } from "express";
import controller from "../controllers/messages";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, controller.getMessages);
router.post('/broadcast',verifyToken, controller.broadcast);
router.put('/update',verifyToken, controller.update);
router.delete('/delete',verifyToken, controller.deleteMessage);

export default router;