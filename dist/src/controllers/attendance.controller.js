"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const attendance_service_1 = __importDefault(require("@/services/attendance.service"));
const attendance_student_service_1 = __importDefault(require("@/services/attendance.student.service"));
const class_service_1 = __importDefault(require("@/services/class.service"));
const CreateNewAttendance = async (req, res) => {
    const payload = req.body;
    try {
        const newAttendance = await attendance_service_1.default.CreateAttendance(payload.session_code, payload.class_code, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.CREATE_SUCCES, 200, newAttendance));
    }
    catch (error) {
        return res.json(res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.WRONG, 400)));
    }
};
const GetAttendance = async (req, res) => {
    const { page, limit, class_code, day, email } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        if (page && limit && class_code) {
            const result = await attendance_service_1.default.GetAttendanceByClassCode(class_code, p, l);
            if (!result) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result));
        }
        else if (class_code && day) {
            const attendance = await attendance_service_1.default.GetAttendanceByClassCodeAndDay(class_code, Number(day));
            if (!attendance) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.NOT_FOUND, 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.USER.FOUND, 200, attendance));
        }
        else if (page && limit && day) {
            const result = await attendance_service_1.default.GetAttendanceByDay(Number(day), p, l);
            if (!result) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, result));
        }
        else if (email && page && limit) {
            const attendances = await attendance_student_service_1.default.GetAttendanceByEmailStudent(email, p, l);
            if (!attendances) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, {
                list: attendances,
                page: p,
                count: attendances.length,
            }));
        }
        else {
            const attendances = await attendance_student_service_1.default.GetAllAttendance(1, 10);
            if (!attendances) {
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
            }
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, {
                list: attendances,
                page: p,
                count: attendances.length,
            }));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
    }
};
const UpdateAttendance = async (req, res) => {
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
const DeleteAttendance = async (req, res) => {
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
exports.default = {
    GetAttendance,
    CreateNewAttendance,
    UpdateAttendance,
    DeleteAttendance,
};
//# sourceMappingURL=attendance.controller.js.map