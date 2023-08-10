"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAccessToken_1 = require("@/middlewares/verifyAccessToken");
const class_controller_1 = __importDefault(require("@/controllers/class.controller"));
const validatejoi_1 = require("@/validation/validatejoi");
const class_joi_1 = require("@/validation/class.joi");
const classRouter = express_1.default.Router();
classRouter.post("/", (0, validatejoi_1.ValidateJoi)(class_joi_1.ClassSchema.Class.create_class), class_controller_1.default.CreateNewClass);
classRouter.put("/", verifyAccessToken_1.verifyAccessJWT, class_controller_1.default.UpdateClass);
classRouter.get("/", class_controller_1.default.GetClass);
classRouter.delete("/all", class_controller_1.default.DeleteManyCourse);
classRouter.delete("/", verifyAccessToken_1.verifyAccessJWT, class_controller_1.default.DeleteOneClass);
exports.default = classRouter;
//# sourceMappingURL=class.route.js.map