"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const response_config_1 = require("@/configs/response.config");
exports.AttendanceSchema = {
    Attendance: {
        create_attendance: joi_1.default.object({
            session_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_SESSION} (import session_id)`,
                "any.required": `{{#label}} is a required field `,
            }),
            class_id: joi_1.default.string()
                .required()
                .messages({
                "string.empty": `${response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_CLASS} (import class_code)`,
                "any.required": `{{#label}} is a required field `,
            }),
        }),
    },
};
//# sourceMappingURL=attendance.joi.js.map