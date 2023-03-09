import { Router } from "express";
import controller from "../controllers/reply";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.post("/add", verifyToken, controller.add);
router.get("/:messageId", verifyToken, controller.getReply);

export default router;