import { Router } from "express";
import controller from "../controllers/auth";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get("/", (req, res) => res.send("Hello World!"));
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/verifyToken", verifyToken, controller.verify);

export default router;