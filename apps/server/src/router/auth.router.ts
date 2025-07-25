import { Router } from "express";
import { login, logout, register } from "../controller/auth.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt, logout);

export default router;