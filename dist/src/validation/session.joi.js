"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.SessionSchema = {
    Session: {
        create_session: joi_1.default.object({
            course: joi_1.default.string().required(),
            class: joi_1.default.string().required(),
            session_code: joi_1.default.string().required(),
            session_name: joi_1.default.string().required(),
            desc: joi_1.default.string().required(),
            status: joi_1.default.string().valid("COMPLETE", "UPCOMPLETE").required()
        }),
        update_session: joi_1.default.object({
            course: joi_1.default.string().required(),
            class: joi_1.default.string().required(),
            session_code: joi_1.default.string().required(),
            session_name: joi_1.default.string().required(),
            desc: joi_1.default.string().required(),
            status: joi_1.default.string().valid("COMPLETE", "UPCOMPLETE").required()
        }),
    }
};
//# sourceMappingURL=session.joi.js.map