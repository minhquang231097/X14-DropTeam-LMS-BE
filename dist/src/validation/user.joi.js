"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.Schema = {
    User: {
        sign_up: joi_1.default.object({
            fullname: joi_1.default.string().min(5).max(100).required(),
            email: joi_1.default.string().min(5).max(100).required(),
            phone_number: joi_1.default.string()
                .regex(/^[0-9]/)
                .min(5)
                .max(100)
                .required(),
            username: joi_1.default.string().min(5).max(100).required(),
            password: joi_1.default.string().min(5).max(100).required(),
            create_at: joi_1.default.string().optional(),
            role: joi_1.default.string().required(),
            dob: joi_1.default.string().optional(),
            gender: joi_1.default.string().optional(),
            address: joi_1.default.string().optional(),
        }),
        sign_in: joi_1.default.object({
            username: joi_1.default.string().min(5).max(100).required(),
            password: joi_1.default.string().min(5).max(100).required(),
        }),
        sign_out: joi_1.default.object({
            id: joi_1.default.string().required(),
        }),
        update: joi_1.default.object({
            fullname: joi_1.default.string().min(5).max(100).optional(),
            email: joi_1.default.string().min(5).max(100).optional(),
            phone_number: joi_1.default.string()
                .regex(/^[0-9]/)
                .min(5)
                .max(100)
                .optional(),
            username: joi_1.default.string().min(5).max(100).optional(),
            password: joi_1.default.string().min(5).max(100).optional(),
            create_at: joi_1.default.string().optional(),
            role: joi_1.default.string().optional(),
            dob: joi_1.default.string().optional(),
            gender: joi_1.default.string().optional(),
            address: joi_1.default.string().optional(),
        }),
    },
};
//# sourceMappingURL=user.joi.js.map