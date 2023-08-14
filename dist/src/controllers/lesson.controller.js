"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const lesson_service_1 = __importDefault(require("@/services/lesson.service"));
const CreateNewLesson = async (req, res) => {
    const { code } = req.query;
    const payload = req.body;
    try {
        const newLesson = await lesson_service_1.default.CreateLesson(code, payload);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.CREATE_SUCCES, 200, newLesson));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
    }
};
const GetLesson = async (req, res) => {
    const { ss_code, page, limit } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        if (ss_code && page && limit) {
            const all = await lesson_service_1.default.GetLessonBySessionCode(ss_code, p, l);
            if (!all)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, all));
        }
        else if (page && limit) {
            const all = await lesson_service_1.default.GetAllLesson(p, l);
            if (!all)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, all));
        }
        else {
            const all = await lesson_service_1.default.GetAllLesson(1, 10);
            if (!all)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
            res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200, all));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 404));
    }
};
const UpdateLesson = async (req, res) => {
    const { id } = req.query;
    const { payload } = req.body;
    try {
        const exist = await lesson_service_1.default.UpdateLessonById(id, payload);
        if (!exist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.FOUND_SUCCESS, 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
    }
};
const DeleteLesson = async (req, res) => {
    const { id } = req.query;
    try {
        const found = await lesson_service_1.default.DeletedLessonById(id);
        if (!found)
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.NOT_FOUND, 404));
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.DELETE_SUCCESS, 200));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.LESSON.WRONG, 400));
    }
};
exports.default = { CreateNewLesson, GetLesson, UpdateLesson, DeleteLesson };
//# sourceMappingURL=lesson.controller.js.map