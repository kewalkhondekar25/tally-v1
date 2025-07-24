import { Router } from "express";
import { health } from "../controller/health.controller";

const router: Router = Router();

router.route("/check").get(health);

export default router;