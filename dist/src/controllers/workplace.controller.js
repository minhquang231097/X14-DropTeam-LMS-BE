"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workplace_service_1 = __importDefault(require("@/services/workplace.service"));
const response_config_1 = require("@/configs/response.config");
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const httpException_1 = __importDefault(require("@/common/httpException"));
const CreateWorkplace = async (req, res) => {
    const { workplace_code } = req.body;
    try {
        const exist = await workplace_service_1.default.GetWorkplaceByCode(workplace_code);
        if (exist)
            return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.CODE_EXIST, 400));
        const workplace = await workplace_service_1.default.CreateWorkplace(req.body);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.CREATE_SUCCES, 200, workplace));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
    }
};
const GetWorkplace = async (req, res) => {
    const { page, limit, workplace_code, search } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const countDoc = await workplace_service_1.default.GetTotalWorkplace();
        if (workplace_code) {
            const result = await workplace_service_1.default.GetWorkplaceByCode(workplace_code);
            if (!result)
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            return res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result));
        }
        else if (search) {
            const num = await workplace_service_1.default.SearchWorkplaceByCondition(search);
            const result = await workplace_service_1.default.SearchWorkplaceByCondition(search, p, l);
            if (!result)
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(num.length / l)));
        }
        else if (page && limit) {
            const result = await workplace_service_1.default.GetAllWorkplace(p, l);
            if (!result)
                return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.ATTENDANCE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
        }
        else {
            const result = await workplace_service_1.default.GetAllWorkplace(1, 10);
            if (!result)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result));
        }
    }
    catch (error) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404));
    }
};
const GetWorkplaceInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await workplace_service_1.default.GetWorkplaceById(id);
        if (!result)
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result));
    }
    catch (error) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
    }
};
const UpdateWorkplace = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const exist = await workplace_service_1.default.GetWorkplaceById(id);
        if (!exist) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
        }
        await workplace_service_1.default.UpdateWorkplace(id, update);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.UPDATE_SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400));
    }
};
const DeletedWorkplace = async (req, res) => {
    const { id } = req.params;
    try {
        const exist = await workplace_service_1.default.GetWorkplaceById(id);
        if (!exist) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400));
        }
        await workplace_service_1.default.DeletedWorkplace(id);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.DELETE_SUCCESS, 200));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
    }
};
exports.default = {
    CreateWorkplace,
    GetWorkplace,
    UpdateWorkplace,
    DeletedWorkplace,
    GetWorkplaceInfo,
};
//# sourceMappingURL=workplace.controller.js.map