"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const sendMail_service_1 = require("@/services/sendMail.service");
const user_service_1 = __importDefault(require("@/services/user.service"));
const SignUp = async (req, res) => {
    try {
        const user = await user_service_1.default.CreateUser(req.body);
        const refreshToken = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, process.env.REFRESHTOKEN_KEY, { expiresIn: process.env.REFRESHTOKEN_TIME });
        const updatedUser = await user_service_1.default.UpdateUserById(user._id, {
            refreshToken,
        });
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SIGNUP_SUCCESS, 200, updatedUser));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400, error.message));
    }
};
const handleRefreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const foundUser = await user_service_1.default.GetUserByCondition({ refreshToken });
        if (!foundUser) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.TOKEN_ERROR, 404));
        }
        else {
            jsonwebtoken_1.default.verify(foundUser.refreshToken, process.env.REFRESHTOKEN_KEY, async (err, payload) => {
                if (err)
                    return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
                const accessToken = jsonwebtoken_1.default.sign({
                    _id: foundUser._id,
                    username: payload.username,
                    role: foundUser.role,
                }, process.env.ACCESSTOKEN_KEY, { expiresIn: process.env.ACCESSTOKEN_TIME });
                res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, {
                    roles: foundUser.role,
                    accessToken,
                }));
            });
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 401, error.message));
    }
};
const SignIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExist = await user_service_1.default.GetUserByUsername(username);
        if (!userExist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_CORRECT, 404));
        }
        const checkPassword = bcryptjs_1.default.compareSync(password, userExist.password);
        if (checkPassword) {
            const accessToken = jsonwebtoken_1.default.sign({
                _id: userExist._id,
                username: userExist.username,
                role: userExist.role,
            }, process.env.ACCESSTOKEN_KEY, { expiresIn: process.env.ACCESSTOKEN_TIME });
            jsonwebtoken_1.default.verify(userExist.refreshToken, process.env.REFRESHTOKEN_KEY, async (err, payload) => {
                if (err) {
                    const newRefreshToken = jsonwebtoken_1.default.sign({
                        _id: userExist._id,
                    }, process.env.REFRESHTOKEN_KEY, { expiresIn: process.env.REFRESHTOKEN_TIME });
                    await user_service_1.default.UpdateUserById(userExist._id, {
                        refreshToken: newRefreshToken,
                    });
                }
            });
            res.status(200).json({
                username: userExist.username,
                id: userExist._id,
                accessToken,
                refreshToken: userExist.refreshToken,
            });
        }
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_CORRECT, 400));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400, error.message));
    }
};
const SignOutUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await user_service_1.default.UpdateUserById(id, { accessToken: "" });
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, user));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
    }
};
const SendEmailVerifyUser = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL, 400));
    }
    try {
        const user = await user_service_1.default.GetUserByEmail(email);
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.ACCESSTOKEN_KEY, { expiresIn: "2m" });
        const updatedUser = await user_service_1.default.UpdateUserById(user._id, {
            refreshToken: token,
        });
        if (updatedUser) {
            const mailOption = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: "Xac thuc nguoi dung",
                text: `This link valid for 2 minutes ${process.env.HOST_FE}/verify?id=${user._id}&token=${updatedUser.refreshToken}`,
            };
            sendMail_service_1.SendMailService.sendMail(mailOption, (err, payload) => {
                if (err)
                    return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
                return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200, payload));
            });
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.EMAIL_INCORRECT, 400));
    }
};
const SendEmailForgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NO_EMAIL, 400));
    }
    try {
        const user = await user_service_1.default.GetUserByEmail(email);
        if (!user) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.ACCESSTOKEN_KEY, { expiresIn: "2m" });
        const updatedUser = await user_service_1.default.UpdateUserById(user._id, {
            refreshToken: token,
        });
        if (updatedUser) {
            const mailOption = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: "Quen mat khau",
                text: `This link valid for 2 minutes ${process.env.HOST_FE}/reset-password?id=${user._id}&token=${updatedUser.refreshToken}`,
            };
            sendMail_service_1.SendMailService.sendMail(mailOption, (err, payload) => {
                if (err)
                    return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.WRONG, 400));
                return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.SUCCESS, 200));
            });
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.EMAIL_INCORRECT, 400));
    }
};
exports.default = {
    SignUp,
    SignIn,
    handleRefreshToken,
    SignOutUser,
    SendEmailForgotPassword,
    SendEmailVerifyUser,
};
//# sourceMappingURL=auth.controller.js.map