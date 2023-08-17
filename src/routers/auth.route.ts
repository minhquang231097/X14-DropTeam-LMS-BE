import userController from "@/controllers/auth.controller";
import express from "express";
import { verifyAccessJWT } from "../middlewares/verifyAccessToken";
import { Schema } from "@/validation/user.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import { CheckRole } from "@/middlewares/checkRole";
import authController from "@/controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", ValidateJoi(Schema.User.sign_up), authController.SignUp,);
authRouter.post("/sign-up/admin", verifyAccessJWT, CheckRole.IsAdmin, ValidateJoi(Schema.User.sign_up), authController.SignUp,);
authRouter.post("/sign-up/admin", verifyAccessJWT, CheckRole.IsMentor, ValidateJoi(Schema.User.sign_up), authController.SignUp,);
authRouter.post("/sign-in", ValidateJoi(Schema.User.sign_in), authController.SignIn,);
authRouter.post("/sign-out", ValidateJoi(Schema.User.sign_out), authController.SignOutUser,);
authRouter.post("/refresh", authController.handleRefreshToken);
authRouter.post("/forgot-password", authController.SendEmailForgotPassword);
authRouter.post("/verify-user", authController.SendEmailVerifyUser);

export default authRouter;
