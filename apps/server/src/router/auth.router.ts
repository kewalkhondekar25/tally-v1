import { Router } from "express";
import { 
    getAuthUser, 
    googleAuthHandler, 
    googleSheetAuthHandler, 
    googleSheetAuthHandlerCallback, 
    login, 
    logout, 
    register 
} from "../controller/auth.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { loginUserSchema, registerUserSchema } from "@repo/common/validation";
import { validate } from "../middleware/validatation.middleware";

const router: Router = Router();

router.route("/register").post(validate(registerUserSchema), register);
router.route("/login").post(validate(loginUserSchema), login);
router.route("/logout").post(verifyJwt, logout);
router.route("/me").get(verifyJwt, getAuthUser);
router.route("/google").post(googleAuthHandler);
router.route("/google-sheet").get(verifyJwt, googleSheetAuthHandler);
router.route("/google-sheet/callback").get(verifyJwt, googleSheetAuthHandlerCallback);

export default router;