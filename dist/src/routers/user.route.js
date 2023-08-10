"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const checkRole_1 = require("@/middlewares/checkRole");
const verifyAccessToken_1 = require("@/middlewares/verifyAccessToken");
const user_joi_1 = require("@/validation/user.joi");
const validatejoi_1 = require("@/validation/validatejoi");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.put("/reset-password", user_controller_1.default.ChangePassword);
userRouter.get("/", verifyAccessToken_1.verifyAccessJWT, checkRole_1.CheckRole.IsAdmin, user_controller_1.default.GetUser);
userRouter.put("/", verifyAccessToken_1.verifyAccessJWT, user_controller_1.default.UpdatePassword);
userRouter.put("/info", verifyAccessToken_1.verifyAccessJWT, (0, validatejoi_1.ValidateJoi)(user_joi_1.Schema.User.update), user_controller_1.default.UpdateUserInfo);
userRouter.delete("/", checkRole_1.CheckRole.IsAdmin, verifyAccessToken_1.verifyAccessJWT, user_controller_1.default.DeleteUser);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map