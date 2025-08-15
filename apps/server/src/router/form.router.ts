import { Router } from "express";
import { 
    createForm, 
    deleteForm, 
    getAllForms, 
    getForm, 
    getFormResponse, 
    getPublishForm, 
    saveForm, 
    submitForm, 
    updateForm 
} from "../controller/form.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { validate } from "../middleware/validatation.middleware";
import { formSaveDataValidation, formSubmitValidation } from "@repo/common/validation";

const router: Router = Router();

router.route("/create").post(verifyJwt, createForm);
router.route("/get-all/:workspaceId").get(verifyJwt, getAllForms);
router.route("/get/:formId").get(verifyJwt, getForm);
router.route("/:formId").patch(verifyJwt, updateForm).delete(verifyJwt, deleteForm);
router.route("/save").post(verifyJwt, validate(formSaveDataValidation), saveForm)
router.route("/publish/:formId").get(verifyJwt, getPublishForm);
router.route("/:slug").post(validate(formSubmitValidation), submitForm);//public
router.route("/response/:formId").get(verifyJwt, getFormResponse);

export default router;