import { Router } from "express";
import { createForm, deleteForm, getAllForms, getForm, updateForm } from "../controller/form.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/create").post(verifyJwt, createForm);
router.route("/get-all/:workspaceId").get(verifyJwt, getAllForms);
router.route("/get/:formId").get(verifyJwt, getForm);
router.route("/:formId").patch(verifyJwt, updateForm).delete(verifyJwt, deleteForm);

export default router;