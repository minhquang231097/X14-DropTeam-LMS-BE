import express from "express";
import { Schema } from "@/validation/user.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { ValidateJoi } from "@/validation/validatejoi";
import authController from "@/controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", ValidateJoi(Schema.User.sign_up), authController.SignUp);
authRouter.post("/sign-up/admin", verifyAccessJWT, ValidateJoi(Schema.User.sign_up), authController.SignUp);
authRouter.post("/sign-up/admin", verifyAccessJWT, ValidateJoi(Schema.User.sign_up), authController.SignUp);
authRouter.post("/sign-in", ValidateJoi(Schema.User.sign_in), authController.SignIn);
authRouter.post("/sign-out", ValidateJoi(Schema.User.sign_out), authController.SignOutUser);
authRouter.post("/refresh", authController.handleRefreshToken);
authRouter.post("/forgot-password", ValidateJoi(Schema.User.forgot_password), authController.SendEmailForgotPassword);
authRouter.post("/verify-user", ValidateJoi(Schema.User.forgot_password), authController.SendEmailVerifyUser);

export default authRouter;
