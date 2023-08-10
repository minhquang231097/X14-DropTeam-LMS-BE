"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const session_service_1 = __importDefault(require("@/services/session.service"));
const CreateNewSession = async (req, res) => {
    const payload = req.body;
    const { course_code } = payload;
    try {
        const session = await session_service_1.default.CreateSession(course_code, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, session));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
const GetSession = async (req, res) => {
    const { page, limit, course_code, class_code } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        if (course_code) {
            const session = await session_service_1.default.GetSessionByCourseCode(course_code);
            if (!session)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, session));
        }
        else if (class_code) {
            const found = await session_service_1.default.GetSessionByClassCode(class_code);
            if (!found)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, found));
        }
        else if (page && limit) {
            const all = await session_service_1.default.GetAllSession(p, l);
            if (!all)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, all));
        }
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
const UpdateSession = async (req, res) => {
    const { id } = req.query;
    const payload = req.body;
    try {
        const session = await session_service_1.default.UpdateSessionById(id, payload);
        if (!session)
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
const DeleteSession = async (req, res) => {
    const { id } = req.query;
    try {
        const session = await session_service_1.default.DeletedCourse(id);
        if (!session)
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
exports.default = { CreateNewSession, GetSession, UpdateSession, DeleteSession };
//# sourceMappingURL=session.controller.js.map