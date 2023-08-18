import userController from "@/controllers/user.controller";
import { CheckRole } from "@/middlewares/checkRole";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { Schema } from "@/validation/user.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const userRouter = express.Router();

userRouter.get("/",verifyAccessJWT, CheckRole(["ADMIN"]),userController.GetUser);
userRouter.put("/reset-password", ValidateJoi(Schema.User.new_password), userController.ChangePassword);
userRouter.put("/", verifyAccessJWT, ValidateJoi(Schema.User.change_password), userController.UpdatePassword);
userRouter.put("/info", verifyAccessJWT, ValidateJoi(Schema.User.update), userController.UpdateUserInfo,);
userRouter.delete("/", verifyAccessJWT, userController.DeleteUser,);

export default userRouter;
