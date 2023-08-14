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
const class_student_service_1 = __importDefault(require("@/services/class.student.service"));
const GetUser = async (req, res) => {
    const { page, limit, email, attendanceId, class_code } = req.query;
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
            const allUsers = await user_service_1.default.GetAllUser(p, l);
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
        else if (page && limit && class_code) {
            const allUsers = await class_student_service_1.default.GetAllStudentInClass(p, l, class_code);
            if (!allUsers) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, allUsers));
        }
        else {
            const allUsers = await user_service_1.default.GetAllUser(1, 10);
            if (!allUsers) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, allUsers));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 404));
    }
};
const SearchUser = async (req, res) => {
    const { q, page, limit } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const [_username, _email, _phone] = await Promise.all([
            user_service_1.default.SearchUserByCondition(p, l, q, "username"),
            user_service_1.default.SearchUserByCondition(p, l, q, "email"),
            user_service_1.default.SearchUserByCondition(p, l, q, "phone_number"),
        ]);
        const all = _username.concat(_email).concat(_phone);
        if (all.length > 0) {
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, all));
        }
        else {
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
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
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    try {
        const exist = await user_service_1.default.GetUserById(_id);
        if (!exist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        const checkPassword = bcryptjs_1.default.compareSync(password, exist.password);
        if (!checkPassword) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
        await user_service_1.default.UpdateUserById(_id, { password: hashedPassword });
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
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
    SearchUser,
};
//# sourceMappingURL=user.controller.js.map