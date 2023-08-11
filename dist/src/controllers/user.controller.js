"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const user_service_1 = __importDefault(require("@/services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const GetUser = async (req, res) => {
    const { page, limit, email, field, filter, attendanceId } = req.query;
    const idUser = req.user._id;
    const p = Number(page);
    const l = Number(limit);
    try {
        if (email) {
            const user = await user_service_1.default.GetUserByEmail(email);
            if (!user) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, user));
        }
        else if (page && limit) {
            const allUsers = await user_service_1.default.SearchUserByCondition(p, l, field, filter);
            if (!allUsers) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, allUsers));
        }
        else if (page && limit && attendanceId) {
            const allUsers = await user_service_1.default.GetUserByAttendance(attendanceId, p, l);
            if (!allUsers) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, allUsers));
        }
        else {
            const info = await user_service_1.default.GetUserById(idUser);
            if (!info) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_LOGIN, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, info));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 404));
    }
};
const ChangePassword = async (req, res) => {
    const { id, token } = req.query;
    const { password } = req.body;
    try {
        const user = user_service_1.default.GetUserById(id);
        if (!user) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, process.env.ACCESSTOKEN_KEY);
        if (user && verifyToken._id) {
            const salt = await bcryptjs_1.default.genSalt(10);
            const newPassword = await bcryptjs_1.default.hash(password, salt);
            const updatedUser = await user_service_1.default.UpdateUserById(id, {
                password: newPassword,
            });
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.PASSWORD_CHANGED, 200));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const UpdateUserInfo = async (req, res) => {
    const { id } = req.user;
    const payload = req.body;
    try {
        const update = await user_service_1.default.UpdateUserById(id, payload);
        if (!update) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, update));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const UpdatePassword = async (req, res) => {
    const { password } = req.body;
    try {
        const exist = await user_service_1.default.GetUserByCondition(password);
        if (!exist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, exist));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const DeleteUser = async (req, res) => {
    const { id, email, username } = req.query;
    try {
        if (id) {
            const user = await user_service_1.default.DeleteUserById(id);
            if (!user) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
        }
        else if (email || username) {
            const user = await user_service_1.default.DeleteUserByCondition(email || username);
            if (!user) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
exports.default = {
    GetUser,
    ChangePassword,
    UpdateUserInfo,
    UpdatePassword,
    DeleteUser,
};
//# sourceMappingURL=user.controller.js.map