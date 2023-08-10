"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkplaceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.WorkplaceSchema = {
    Workplace: {
        create_workplace: joi_1.default.object({
            name: joi_1.default.string().max(100).required(),
            address: joi_1.default.string().max(200).required(),
            status: joi_1.default.string().valid("ON", "OFF", "UPCOMING").required(),
            workplace_code: joi_1.default.string().max(5).required(),
        }),
        update_workplace: joi_1.default.object({
            name: joi_1.default.string().max(100).required(),
            address: joi_1.default.string().max(200).required(),
            status: joi_1.default.string().valid("ON", "OFF", "UPCOMING").required(),
            workplace_code: joi_1.default.string().max(5).required(),
        }),
    },
};
//# sourceMappingURL=workplace.joi.js.map