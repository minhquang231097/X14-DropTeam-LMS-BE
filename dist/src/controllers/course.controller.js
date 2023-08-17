"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_service_1 = __importDefault(require("@/services/course.service"));
const response_config_1 = require("@/configs/response.config");
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const httpException_1 = __importDefault(require("@/common/httpException"));
const course_model_1 = require("@/models/course.model");
const course_service_2 = __importDefault(require("@/services/course.service"));
const CreateCourse = async (req, res) => {
    const payload = req.body;
    const { workplace_code } = payload;
    try {
        const newCourse = await course_service_1.default.CreateCourse(workplace_code, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.CREATE_SUCCES, 200, newCourse));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
    }
};
const GetCourse = async (req, res) => {
    const { code, id, page, limit, search } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const total = await course_service_1.default.GetTotalCourse();
        if (id) {
            const courseExist = await course_service_1.default.GetCourseById(id);
            if (!courseExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, courseExist));
        }
        else if (code) {
            const courseExist = await course_service_1.default.GetCourseByCode(code);
            if (!courseExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, courseExist));
        }
        else if (search) {
            const allCourses = await course_service_2.default.SearchCourseByCondition(p, l, search);
            if (!allCourses) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
                allCourses,
                total,
                page: p,
            }));
        }
        else if (search) {
            const allCourses = await course_service_2.default.SearchCourseByCondition(p, l, search);
            if (!allCourses) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
                allCourses,
                page: p,
                count: l,
                total,
            }));
        }
        else if (page && limit) {
            const allCourses = await course_service_1.default.GetAllCourse(p, l);
            if (!allCourses) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
                allCourses,
                page: p,
                count: l,
                total_page: Math.ceil(total / l),
                total,
            }));
        }
        else {
            const allCourses = await course_service_1.default.GetAllCourse(1, 10);
            if (!allCourses) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.FOUND_SUCCESS, 200, {
                allCourses,
                total,
                page: 1,
                limit: 10,
            }));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400));
    }
};
const UpdateCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const update = req.body;
        const courseExist = await course_service_1.default.GetCourseById(id);
        if (!courseExist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
        }
        const updateCourse = await course_service_1.default.UpdateCourse(id, update);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.UPDATE_SUCCESS, 200, updateCourse));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
    }
};
const DeletedCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const courseExist = await course_service_1.default.GetCourseById(id);
        if (!courseExist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
        }
        const deleteCourse = await course_service_1.default.DeletedCourse(id);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.DELETE_SUCCESS, 200, deleteCourse));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
    }
};
const DeletedAllCourse = async (req, res) => {
    try {
        const courseDeleted = await course_model_1.Course.deleteMany();
        if (!courseDeleted) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.NOT_FOUND, 400));
        }
        res.sendStatus(200);
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.WRONG, 400, error.message));
    }
};
exports.default = {
    CreateCourse,
    UpdateCourse,
    DeletedCourse,
    DeletedAllCourse,
    GetCourse,
};
//# sourceMappingURL=course.controller.js.map