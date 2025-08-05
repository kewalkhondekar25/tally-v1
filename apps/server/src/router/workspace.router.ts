import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import { createWorkspace, deleteWorkspace, getAllWorkspaces, getWorkspace, updateWorkspace } from "../controller/workspace.controller";

const router: Router = Router();

router.route("/get-all").get(verifyJwt, getAllWorkspaces);
router.route("/get/:workspaceId").get(verifyJwt, getWorkspace);
router.route("/create").post(verifyJwt, createWorkspace);
router.route("/update/:workspaceId").patch(verifyJwt, updateWorkspace);
router.route("/delete/:workspaceId").delete(verifyJwt, deleteWorkspace);

export default router;