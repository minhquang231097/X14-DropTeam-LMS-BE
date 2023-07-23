import userController from "@/controllers/user.controller"
import express from "express"
import { verifyAccessJWT } from "../middlewares/verifyAccessToken"
import { ValidateJoi } from "@/validation/validatejoi"
import { Schema } from "@/validation/user.joi"

const userRouter = express.Router()

userRouter.post("/sign-up", ValidateJoi(Schema.User.sign_up), userController.SignUp)
userRouter.post("/sign-in", ValidateJoi(Schema.User.sign_in), userController.SignIn)
userRouter.post("/sign-out", ValidateJoi(Schema.User.sign_out), userController.SignOutUser)
userRouter.post("/refresh", userController.handleRefreshToken)
userRouter.get("/user", verifyAccessJWT, userController.GetAllUser)

export default userRouter