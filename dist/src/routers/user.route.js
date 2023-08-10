"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const express_1 = __importDefault(require("express"));
const verifyAccessToken_1 = require("../middlewares/verifyAccessToken");
const user_joi_1 = require("@/validation/user.joi");
const validatejoi_1 = require("@/validation/validatejoi");
const checkRole_1 = require("@/middlewares/checkRole");
const userRouter = express_1.default.Router();
userRouter.post("/sign-up", (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_up), user_controller_1.default.SignUp);
userRouter.post("/sign-up/admin", verifyAccessToken_1.verifyAccessJWT, checkRole_1.CheckRole.IsAdmin, (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_up), user_controller_1.default.SignUp);
userRouter.post("/sign-up/admin", verifyAccessToken_1.verifyAccessJWT, checkRole_1.CheckRole.IsMentor, (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_up), user_controller_1.default.SignUp);
userRouter.post("/sign-in", (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_in), user_controller_1.default.SignIn);
userRouter.post("/sign-out", (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_out), user_controller_1.default.SignOutUser);
userRouter.post("/refresh", user_controller_1.default.handleRefreshToken);
userRouter.post("/forgot-password", user_controller_1.default.SendEmailForgotPassword);
userRouter.post("/verify-user", user_controller_1.default.SendEmailVerifyUser);
userRouter.put("/reset-password", user_controller_1.default.ChangePassword);
userRouter.get("/user", verifyAccessToken_1.verifyAccessJWT, checkRole_1.CheckRole.IsAdmin, user_controller_1.default.GetUser);
userRouter.put("/user", verifyAccessToken_1.verifyAccessJWT, user_controller_1.default.UpdatePassword);
userRouter.put("/user/info", verifyAccessToken_1.verifyAccessJWT, (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.update), user_controller_1.default.UpdateUserInfo);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map