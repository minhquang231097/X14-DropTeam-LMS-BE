"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AttendanceSchema = {
    Attendance: {
        create_attendance: joi_1.default.object({
            session: joi_1.default.string().required(),
            class: joi_1.default.string().required(),
            day: joi_1.default.number().required(),
            absence: joi_1.default.string().required(),
            class_size: joi_1.default.number().required(),
        }),
        update_attendance: joi_1.default.object({
            session: joi_1.default.string().required(),
            class: joi_1.default.string().required(),
            day: joi_1.default.number().required(),
            absence: joi_1.default.string().required(),
            class_size: joi_1.default.number().required(),
        }),
    }
};
//# sourceMappingURL=attendance.joi.js.map