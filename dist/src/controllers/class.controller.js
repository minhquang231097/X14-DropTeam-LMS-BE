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
    const { mentor, workplace, course } = req.body;
    const payload = req.body;
    try {
        const newClass = await class_service_1.default.CreateOneClass(mentor, workplace, course, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, newClass));
    }
    catch (error) {
        return res.json(res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400)));
    }
};
const AddStudentToClass = async (req, res) => {
    const { email, class_code } = req.body;
    try {
        const result = await class_student_service_1.default.AddStudentToClass(email, class_code);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200));
    }
    catch (error) {
        return res.json(res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400)));
    }
};
const GetClass = async (req, res) => {
    const { page, limit, id, code, email } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        if (id) {
            const classExist = await class_service_1.default.GetClassById(id);
            if (!classExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
            }
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, classExist));
        }
        else if (code) {
            const classExist = await class_service_1.default.GetClassByCode(code);
            if (!classExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, classExist));
        }
        else if (email) {
            const classExist = await class_student_service_1.default.GetClassByStudentEmail(p, l, email);
            if (!classExist) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, classExist));
        }
        else if (page && limit) {
            const allClasses = await class_service_1.default.GetAllClass(p, l);
            if (!allClasses) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, {
                list: allClasses,
                page: p,
                count: allClasses.length,
            }));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
    }
};
const UpdateClass = async (req, res) => {
    const { id } = req.query;
    const update = req.body;
    try {
        const classUpdated = await class_service_1.default.UpdateOneClass(id, update);
        if (!classUpdated) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, classUpdated));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
const DeleteOneClass = async (req, res) => {
    const { id } = req.query;
    try {
        const classDeleted = await class_service_1.default.DeleteClassById(id);
        if (!classDeleted) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400, error.message));
    }
};
const DeleteManyCourse = async (req, res) => {
    const filter = req.body;
    try {
        const classDeleted = await class_service_1.default.DeleteClassByCondition(filter);
        if (!classDeleted) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400, error.message));
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