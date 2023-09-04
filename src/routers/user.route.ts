import userController from "@/controllers/user.controller";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { Schema } from "@/validation/user.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", verifyAccessJWT, userController.GetUser);
userRouter.get("/info", verifyAccessJWT, userController.GetUserInfo);
userRouter.get("/info/:id", verifyAccessJWT, userController.GetUserInfoById);
userRouter.put("/reset-password", ValidateJoi(Schema.User.new_password), userController.ChangePassword);
userRouter.put("/:id", verifyAccessJWT, ValidateJoi(Schema.User.update), userController.UpdateUserInfo);
userRouter.put("/", verifyAccessJWT, ValidateJoi(Schema.User.update), userController.UpdateInfo);
userRouter.put(
  "/change-password",
  verifyAccessJWT,
  ValidateJoi(Schema.User.change_password),
  userController.UpdatePassword,
);
userRouter.delete("/:id", verifyAccessJWT, userController.DeleteUser);

export default userRouter;
