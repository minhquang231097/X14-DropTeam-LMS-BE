"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const feedback_service_1 = __importDefault(require("@/services/feedback.service"));
const CreateNewFeekback = async (req, res) => {
    const payload = req.body;
    const { course_code, email } = req.body;
    try {
        const session = await feedback_service_1.default.CreateFeedback(course_code, email, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, session));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
const GetFeedback = async (req, res) => {
    const { page, limit, course_code, email } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        if (course_code) {
            const feedback = await feedback_service_1.default.GetFeedbackByCourseCode(course_code);
            if (!feedback)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, feedback));
        }
        else if (email) {
            const student = await feedback_service_1.default.GetFeedbackByEmailStudent(email);
            if (!student)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, student));
        }
        else if (page && limit) {
            const all = await feedback_service_1.default.GetFeedbackByCondition(p, l);
            if (!all)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, all));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
const UpdateFeedback = async (req, res) => {
    const { id } = req.query;
    const payload = req.body;
    try {
        const feedback = await feedback_service_1.default.UpdateFeedback(id, payload);
        if (!feedback)
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200, feedback));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
const DeleteFeedback = async (req, res) => {
    const { id } = req.query;
    try {
        const feedback = await feedback_service_1.default.DeleteFeedbackById(id);
        if (!feedback)
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[404], 404));
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[200], 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE[400], 400));
    }
};
exports.default = {
    CreateNewFeekback,
    GetFeedback,
    UpdateFeedback,
    DeleteFeedback,
};
//# sourceMappingURL=feedback.controller.js.map