"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_controller_1 = __importDefault(require("@/controllers/course.controller"));
const express_1 = __importDefault(require("express"));
const validatejoi_1 = require("@/validation/validatejoi");
const course_joi_1 = require("@/validation/course.joi");
const verifyAccessToken_1 = require("@/middlewares/verifyAccessToken");
const courseRouter = express_1.default.Router();
courseRouter.post("/", verifyAccessToken_1.verifyAccessJWT, (0, validatejoi_1.ValidateJoi)(course_joi_1.CourseSchema.Course.create_course), course_controller_1.default.CreateCourse);
courseRouter.put("/", verifyAccessToken_1.verifyAccessJWT, (0, validatejoi_1.ValidateJoi)(course_joi_1.CourseSchema.Course.update_course), course_controller_1.default.UpdateCourse);
courseRouter.get("/", course_controller_1.default.GetCourse);
courseRouter.delete("/all", course_controller_1.default.DeletedAllCourse);
courseRouter.delete("/", verifyAccessToken_1.verifyAccessJWT, course_controller_1.default.DeletedCourse);
exports.default = courseRouter;
//# sourceMappingURL=course.route.js.map