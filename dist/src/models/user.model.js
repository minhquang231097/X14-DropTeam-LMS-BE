"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
    create_at: { type: Date, default: Date.now() },
});
exports.User = (0, mongoose_1.model)("users", userSchema);
//# sourceMappingURL=user.model.js.map