"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_service_1 = __importDefault(require("@/services/course.service"));
const response_config_1 = require("@/configs/response.config");
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const httpException_1 = __importDefault(require("@/common/httpException"));
const course_service_2 = __importDefault(require("@/services/course.service"));
const LIMIT_PAGE_COURSE = 10;
const CreateCourse = async (req, res) => {
    const payload = req.body;
    const { course_code } = payload;
    try {
        const _course = await course_service_1.default.GetCourseByCode(course_code);
        if (_course)
            return res.status(403).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.CODE_EXIST, 403));
        const newCourse = await course_service_1.default.CreateCourse(payload);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.CREATE_SUCCES, 200, newCourse));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
    }
};
const GetCourse = async (req, res) => {
    const { page, limit, search } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const countDoc = await course_service_1.default.GetTotalCourse();
        if (search) {
            const num = await course_service_2.default.SearchCourseByCondition(search);
            let result;
            if (p === undefined && l === undefined) {
                result = await course_service_2.default.SearchCourseByCondition(search, 1, LIMIT_PAGE_COURSE);
            }
            else {
                result = await course_service_2.default.SearchCourseByCondition(search, p, l);
            }
            if (result.length === 0)
                return res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (page && limit) {
            const result = await course_service_1.default.GetAllCourse(p, l);
            if (result.length === 0)
                return res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
        }
        else {
            const result = await course_service_1.default.GetAllCourse(1, LIMIT_PAGE_COURSE);
            if (result.length === 0)
                return res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_NO_DATA, 200));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, result, result.length, countDoc, 1, Math.ceil(countDoc / LIMIT_PAGE_COURSE)));
        }
    }
    catch (error) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 404));
    }
};
const GetCourseInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const exist = await course_service_1.default.GetCourseById(id);
        if (!exist)
            return res.status(404).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, exist));
    }
    catch (error) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 404));
    }
};
const UpdateCourse = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const exist = await course_service_1.default.GetCourseById(id);
        if (!exist)
            return res.status(404).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
        await course_service_1.default.UpdateCourse(id, update);
        const newCourse = await course_service_1.default.GetCourseById(id);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.UPDATE_SUCCESS, 200, newCourse));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
    }
};
const DeletedCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const exist = await course_service_1.default.GetCourseById(id);
        if (!exist)
            return res.status(404).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
        await course_service_1.default.DeletedCourse(id);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.DELETE_SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400));
    }
};
exports.default = {
    CreateCourse,
    UpdateCourse,
    DeletedCourse,
    GetCourse,
    GetCourseInfo,
};
//# sourceMappingURL=course.controller.js.map