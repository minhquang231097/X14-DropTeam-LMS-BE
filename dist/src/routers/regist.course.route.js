"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regist_course_controller_1 = __importDefault(require("@/controllers/regist.course.controller"));
const verifyAccessToken_1 = require("@/middlewares/verifyAccessToken");
const regist_course_joi_1 = require("@/validation/regist.course.joi");
const validatejoi_1 = require("@/validation/validatejoi");
const express_1 = __importDefault(require("express"));
const registCourseRouter = express_1.default.Router();
registCourseRouter.post("/", (0, validatejoi_1.ValidateJoi)(regist_course_joi_1.RegistSchema.Regist.regist_course), verifyAccessToken_1.verifyAccessJWT, regist_course_controller_1.default.RegistedNewCourse);
registCourseRouter.get("/", verifyAccessToken_1.verifyAccessJWT, regist_course_controller_1.default.GetRegist);
registCourseRouter.put("/", verifyAccessToken_1.verifyAccessJWT, regist_course_controller_1.default.UpdateRegist);
registCourseRouter.delete("/", verifyAccessToken_1.verifyAccessJWT, regist_course_controller_1.default.DeleteRegist);
exports.default = registCourseRouter;
//# sourceMappingURL=regist.course.route.js.map