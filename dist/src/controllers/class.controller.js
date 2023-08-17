"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const class_service_1 = __importDefault(require("@/services/class.service"));
const class_student_service_1 = __importDefault(require("@/services/class.student.service"));
const CreateNewClass = async (req, res) => {
    const { mentor, workplace, course, class_code } = req.body;
    const payload = req.body;
    try {
        const exist = await class_service_1.default.GetClassByCode(class_code);
        if (exist)
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.CLASS_EXIST, 403));
        const newClass = await class_service_1.default.CreateOneClass(mentor, workplace, course, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.CREATE_SUCCES, 200, newClass));
    }
    catch (error) {
        return res.json(res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400)));
    }
};
const AddStudentToClass = async (req, res) => {
    const { email, class_code } = req.body;
    try {
        const result = await class_student_service_1.default.AddStudentToClass(email, class_code);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.ADD_STU_SUCCESS, 200));
    }
    catch (error) {
        return res.json(res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400)));
    }
};
const GetClass = async (req, res) => {
    const { page, limit, id, email, search, course_code } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const countDoc = await class_service_1.default.GetTotalClass();
        if (id) {
            const classExist = await class_service_1.default.GetClassById(id);
            if (!classExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, classExist));
        }
        else if (course_code) {
            const _class = await class_service_1.default.GetClassByCourseCode(course_code, p, l);
            if (!_class) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
                list: _class,
                page: p,
                total: countDoc,
                count: _class.length,
                total_page: Math.ceil(_class.length / l),
            }));
        }
        else if (search) {
            const classExist = await class_service_1.default.SearchClassByCondition(p, l, search);
            if (!classExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
                list: classExist,
                page: p,
                count: classExist.length,
                total: countDoc,
                total_page: Math.ceil(classExist.length / l),
            }));
        }
        else if (email) {
            const classExist = await class_student_service_1.default.GetClassByStudentEmail(p, l, email);
            if (!classExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
                list: classExist,
                page: p,
                count: classExist.length,
                total: countDoc,
                total_page: Math.ceil(classExist.length / l),
            }));
        }
        else if (page && limit) {
            const allClasses = await class_service_1.default.GetAllClass(p, l);
            if (!allClasses) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
                list: allClasses,
                page: p,
                count: allClasses.length,
                total_page: Math.ceil(allClasses.length / l),
                total: countDoc,
            }));
        }
        else {
            const allClasses = await class_service_1.default.GetAllClass(1, 10);
            if (!allClasses) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, {
                list: allClasses,
                page: 1,
                total: countDoc,
            }));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
    }
};
const UpdateClass = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const classUpdated = await class_service_1.default.UpdateOneClass(id, update);
        if (!classUpdated) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200, classUpdated));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
    }
};
const DeleteOneClass = async (req, res) => {
    const { id } = req.params;
    try {
        const classDeleted = await class_service_1.default.DeleteClassById(id);
        if (!classDeleted) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.DELETE_SUCCESS, 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400, error.message));
    }
};
const DeleteManyCourse = async (req, res) => {
    const filter = req.body;
    try {
        const classDeleted = await class_service_1.default.DeleteClassByCondition(filter);
        if (!classDeleted) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.DELETE_SUCCESS, 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400, error.message));
    }
};
exports.default = {
    CreateNewClass,
    GetClass,
    UpdateClass,
    DeleteOneClass,
    DeleteManyCourse,
    AddStudentToClass,
};
//# sourceMappingURL=class.controller.js.map