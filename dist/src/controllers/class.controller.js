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
const course_service_1 = __importDefault(require("@/services/course.service"));
const user_service_1 = __importDefault(require("@/services/user.service"));
const workplace_service_1 = __importDefault(require("@/services/workplace.service"));
const CreateNewClass = async (req, res) => {
    const { class_code, course_id, workplace_id, mentor_id } = req.body;
    const payload = req.body;
    try {
        const [_course, _workplace, _mentor, _class] = await Promise.all([
            course_service_1.default.GetCourseById(course_id),
            workplace_service_1.default.GetWorkplaceById(workplace_id),
            user_service_1.default.GetUserById(mentor_id),
            class_service_1.default.GetClassByCode(class_code),
        ]);
        if (!_course || !_workplace || !_mentor || _class)
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_EXIST, 404));
        const newClass = await class_service_1.default.CreateOneClass(payload);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.CREATE_SUCCES, 200, newClass));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
    }
};
const AddStudentToClass = async (req, res) => {
    const { list } = req.body;
    try {
        if (list.length === 0)
            return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.CLASS_EXIST, 400));
        const result = await class_student_service_1.default.AddStudentToClass(list);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.ADD_STU_SUCCESS, 200, result));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
    }
};
const GetClass = async (req, res) => {
    const { page, limit, student_id, search, course_id, status } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const countDoc = await class_service_1.default.GetTotalClass();
        if (course_id) {
            const num = await class_service_1.default.GetClassByCourseId(course_id);
            const result = await class_service_1.default.GetClassByCourseId(course_id, p, l);
            if (result.length === 0) {
                return res.status(404).json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (status) {
            const num = await class_service_1.default.GetClassByStatus(status);
            const result = await class_service_1.default.GetClassByStatus(status, p, l);
            if (result.length === 0) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (search) {
            const num = await class_service_1.default.SearchClassByCondition(search);
            const result = await class_service_1.default.SearchClassByCondition(search, p, l);
            if (result.length === 0) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(num.length / l)));
        }
        else if (student_id) {
            const num = await class_student_service_1.default.GetClassByStudentId(student_id);
            const result = await class_student_service_1.default.GetClassByStudentId(student_id, p, l);
            if (result.length === 0) {
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (page && limit) {
            const result = await class_service_1.default.GetAllClass(p, l);
            if (result.length === 0) {
                return res.status(404).json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
        }
        else {
            const result = await class_service_1.default.GetAllClass(1, 10);
            if (result.length === 0) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
            }
            res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result));
        }
    }
    catch (error) {
        res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
    }
};
const GetClassInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await class_service_1.default.GetClassById(id);
        if (!result) {
            return res.status(404).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.FOUND_SUCCESS, 200, result));
    }
    catch (error) {
        return res.status(404).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
    }
};
const UpdateClass = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const classUpdated = await class_service_1.default.UpdateOneClass(id, update);
        if (!classUpdated) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
    }
};
const UpdateStatusStudentInClass = async (req, res) => {
    const payload = req.body;
    const { student_id, class_id } = payload;
    try {
        const [_student, _class] = await Promise.all([user_service_1.default.GetUserById(student_id), class_service_1.default.GetClassById(class_id)]);
        if (!_student || !_class)
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
        const result = await class_student_service_1.default.UpdateStatusStudentInClass(payload);
        if (!result) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 404));
        }
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.UPDATE_SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
    }
};
const DeleteOneClass = async (req, res) => {
    const { id } = req.params;
    try {
        const classDeleted = await class_service_1.default.DeleteClassById(id);
        if (!classDeleted) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.NOT_FOUND, 404));
        }
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.DELETE_SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.WRONG, 400));
    }
};
exports.default = {
    CreateNewClass,
    GetClass,
    UpdateClass,
    DeleteOneClass,
    AddStudentToClass,
    GetClassInfo,
    UpdateStatusStudentInClass,
};
//# sourceMappingURL=class.controller.js.map