"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegistSchema = {
    Regist: {
        regist_course: joi_1.default.object({
            fullname: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            phone_number: joi_1.default.string().regex(/^[0-9]/).min(5).max(100).required(),
            course: joi_1.default.string().required(),
            workplace: joi_1.default.string().required(),
            note: joi_1.default.string().required(),
            student: joi_1.default.string().required(),
        }),
    }
};
//# sourceMappingURL=regist.course.joi.js.map