import { Router } from "express";
import controller from "../controllers/auth";

const router = Router();

router.get("/", (req, res) => res.send("Hello World!"));
router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;