"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const response_config_1 = require("@/configs/response.config");
const userSchema = new mongoose_1.Schema({
    fullname: String,
    email: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.USER.EMAIL_ERROR] },
    phone_number: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.USER.PHONE_ERROR] },
    username: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.USER.USERNAME_ERROR] },
    password: String,
    role: { type: String, enum: ["STUDENT", "MENTOR", "ADMIN"] },
    refreshToken: String,
    dob: String,
    gender: String,
    address: String,
    create_at: { type: Date, default: Date.now(), },
    formated_date: String,
});
userSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
userSchema.index({ username: "text", email: "text", fullname: "text" });
exports.User = (0, mongoose_1.model)("users", userSchema);
//# sourceMappingURL=user.model.js.map