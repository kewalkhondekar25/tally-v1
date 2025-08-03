import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import { createWorkspace } from "../controller/workspace";

const router: Router = Router();

router.route("/create").post(verifyJwt, createWorkspace);

export default router;