"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const regist_course_service_1 = __importDefault(require("@/services/regist.course.service"));
const RegistedNewCourse = async (req, res) => {
    const { _id } = req.user;
    const { course_code, note } = req.body;
    try {
        const newRegist = await regist_course_service_1.default.CreateRegistCourse(course_code, _id, note);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.CREATE_SUCCES, newRegist));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
    }
};
const GetRegist = async (req, res) => {
    const { wp_code, course_code, email, page, limit } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        if (page && limit) {
            const allRegist = await regist_course_service_1.default.GetAllRegist(p, l);
            if (!allRegist)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, allRegist));
        }
        else if (page && limit && course_code) {
            const allRegist = await regist_course_service_1.default.GetRegistByCourseCode(course_code, p, l);
            if (!allRegist)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, allRegist));
        }
        else if (page && limit && wp_code) {
            const allRegist = await regist_course_service_1.default.GetRegistByWorkplaceCode(wp_code, p, l);
            if (!allRegist)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, allRegist));
        }
        else if (page && limit && email) {
            const allRegist = await regist_course_service_1.default.GetRegistByCourseCode(wp_code, p, l);
            if (!allRegist)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, allRegist));
        }
        else {
            const allRegist = await regist_course_service_1.default.GetAllRegist(1, 10);
            if (!allRegist)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200, allRegist));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 404));
    }
};
const UpdateRegist = async (req, res) => {
    const { id } = req.query;
    const { payload } = req.body;
    try {
        const exist = await regist_course_service_1.default.GetRegistById(id);
        if (!exist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.NOT_FOUND, 404));
        }
        await regist_course_service_1.default.UpdateRegist(id, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
    }
};
const DeleteRegist = async (req, res) => {
    const { id } = req.query;
    try {
        const updatedRegist = await regist_course_service_1.default.DeleteRegist(id);
        if (!updatedRegist)
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.FOUND_SUCCESS, 404));
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.DELETE_SUCCESS, 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.REGIST.WRONG, 400));
    }
};
exports.default = { RegistedNewCourse, GetRegist, UpdateRegist, DeleteRegist };
//# sourceMappingURL=regist.course.controller.js.map