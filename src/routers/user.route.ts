import userController from "@/controllers/user.controller";
import { CheckRole } from "@/middlewares/checkRole";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import { Schema } from "@/validation/user.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const userRouter = express.Router();

userRouter.put("/reset-password", userController.ChangePassword);
userRouter.get("/", verifyAccessJWT, CheckRole.IsAdmin, userController.GetUser);
userRouter.put("/", verifyAccessJWT, userController.UpdatePassword);
userRouter.put(
  "/info",
  verifyAccessJWT,
  ValidateJoi(Schema.User.update),
  userController.UpdateUserInfo,
);
userRouter.delete(
  "/",
  CheckRole.IsAdmin,
  verifyAccessJWT,
  userController.DeleteUser,
);

export default userRouter;
