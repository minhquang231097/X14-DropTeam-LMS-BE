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
    const { page, limit, attendance_id, class_id, search } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const countDoc = await user_service_1.default.GetTotalUser();
        if (class_id) {
            const num = await class_student_service_1.default.GetAllStudentInClass(class_id);
            const result = await class_student_service_1.default.GetAllStudentInClass(class_id, p, l);
            if (!result) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (attendance_id) {
            const num = await user_service_1.default.GetUserByAttendance(attendance_id);
            const result = await user_service_1.default.GetUserByAttendance(attendance_id, p, l);
            if (!result) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (search) {
            const num = await user_service_1.default.SearchUserByCondition(search);
            const result = await user_service_1.default.SearchUserByCondition(search, p, l);
            if (!result) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(num.length / l)));
        }
        else if (page && limit) {
            const result = await user_service_1.default.GetAllUser(p, l);
            if (!result) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
        }
        else {
            const result = await user_service_1.default.GetAllUser(1, 10);
            if (!result) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, result));
        }
    }
    catch (error) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 404));
    }
};
const ChangePassword = async (req, res) => {
    const { id, token } = req.query;
    const { password } = req.body;
    try {
        const user = user_service_1.default.GetUserById(id);
        if (!user) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_CORRECT, 404));
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, process.env.ACCESSTOKEN_KEY);
        if (user && verifyToken._id) {
            const salt = await bcryptjs_1.default.genSalt(10);
            const newPassword = await bcryptjs_1.default.hash(password, salt);
            await user_service_1.default.UpdateUserById(id, {
                password: newPassword,
            });
            return res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.PASSWORD_CHANGED, 200));
        }
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const GetUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await user_service_1.default.GetUserById(id);
        if (!user) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, user));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const UpdateUserInfo = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const exist = await user_service_1.default.GetUserById(id);
        if (!exist) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        await user_service_1.default.UpdateUserById(id, payload);
        res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const UpdatePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    try {
        const exist = await user_service_1.default.GetUserById(_id);
        if (!exist) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        const checkPassword = bcryptjs_1.default.compareSync(password, exist.password);
        if (!checkPassword) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.PASS_NOT_CORRECT, 404));
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
        await user_service_1.default.UpdateUserById(_id, { password: hashedPassword });
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const exist = await user_service_1.default.DeleteUserById(id);
        if (!exist) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
        }
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
exports.default = {
    GetUser,
    ChangePassword,
    UpdateUserInfo,
    UpdatePassword,
    DeleteUser,
    GetUserInfo,
};
//# sourceMappingURL=user.controller.js.map