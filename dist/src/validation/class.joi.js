"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ClassSchema = {
    Class: {
        create_class: joi_1.default.object({
            mentor: joi_1.default.string().required(),
            workplace: joi_1.default.string().required(),
            course: joi_1.default.string().required(),
            class_code: joi_1.default.string().max(10).required(),
            start_at: joi_1.default.string().required(),
            end_at: joi_1.default.string().optional(),
            session_per_week: joi_1.default.number().integer().optional(),
            schedule: joi_1.default.array().required(),
            total_session: joi_1.default.number().integer().required(),
            class_size: joi_1.default.number().integer().required(),
            formated_date: joi_1.default.string().optional(),
        }),
    },
};
//# sourceMappingURL=class.joi.js.map