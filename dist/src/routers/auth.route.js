"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAccessToken_1 = require("../middlewares/verifyAccessToken");
const user_joi_1 = require("@/validation/user.joi");
const validatejoi_1 = require("@/validation/validatejoi");
const checkRole_1 = require("@/middlewares/checkRole");
const auth_controller_1 = __importDefault(require("@/controllers/auth.controller"));
const authRouter = express_1.default.Router();
authRouter.post("/sign-up", (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_up), auth_controller_1.default.SignUp);
authRouter.post("/sign-up/admin", verifyAccessToken_1.verifyAccessJWT, checkRole_1.CheckRole.IsAdmin, (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_up), auth_controller_1.default.SignUp);
authRouter.post("/sign-up/admin", verifyAccessToken_1.verifyAccessJWT, checkRole_1.CheckRole.IsMentor, (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_up), auth_controller_1.default.SignUp);
authRouter.post("/sign-in", (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_in), auth_controller_1.default.SignIn);
authRouter.post("/sign-out", (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.sign_out), auth_controller_1.default.SignOutUser);
authRouter.post("/refresh", auth_controller_1.default.handleRefreshToken);
authRouter.post("/forgot-password", auth_controller_1.default.SendEmailForgotPassword);
authRouter.post("/verify-user", auth_controller_1.default.SendEmailVerifyUser);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map