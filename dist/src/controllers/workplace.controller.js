"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_config_1 = require("@/configs/response.config");
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const httpException_1 = __importDefault(require("@/common/httpException"));
const workplace_service_1 = __importDefault(require("@/services/workplace.service"));
const LIMIT_PAGE_WORKPLACE = 10;
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
    const { page, limit, search, status } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const countDoc = await workplace_service_1.default.GetTotalWorkplace();
        if (status) {
            const num = await workplace_service_1.default.GetWorkplaceByStatus(status);
            let result;
            if (p === undefined && l === undefined) {
                result = await workplace_service_1.default.GetWorkplaceByStatus(status, 1, LIMIT_PAGE_WORKPLACE);
            }
            else {
                result = await workplace_service_1.default.GetWorkplaceByStatus(status, p, l);
            }
            if (result.length === 0) {
                return res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
            }
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (search) {
            const num = await workplace_service_1.default.SearchWorkplaceByCondition(search);
            let result;
            if (p === undefined && l === undefined) {
                result = await workplace_service_1.default.SearchWorkplaceByCondition(search, 1, LIMIT_PAGE_WORKPLACE);
            }
            else {
                result = await workplace_service_1.default.SearchWorkplaceByCondition(search, p, l);
            }
            if (result.length === 0)
                return res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, num.length, p, Math.ceil(num.length / l)));
        }
        else if (page && limit) {
            const result = await workplace_service_1.default.GetAllWorkplace(p, l);
            if (result.length === 0)
                return res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, countDoc, p, Math.ceil(countDoc / l)));
        }
        else {
            const result = await workplace_service_1.default.GetAllWorkplace(1, LIMIT_PAGE_WORKPLACE);
            if (result.length === 0)
                return res.status(200).send(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_NO_DATA, 200));
            res
                .status(200)
                .json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result, result.length, countDoc, 1, Math.ceil(countDoc / LIMIT_PAGE_WORKPLACE)));
        }
    }
    catch (error) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404));
    }
};
const GetWorkplaceInfo = async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
    }
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
    if (id.length != 24) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
    }
    try {
        const exist = await workplace_service_1.default.GetWorkplaceById(id);
        if (!exist) {
            return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
        }
        await workplace_service_1.default.UpdateWorkplace(id, update);
        const newWorkplace = await workplace_service_1.default.GetWorkplaceById(id);
        res.status(200).json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.UPDATE_SUCCESS, 200, newWorkplace));
    }
    catch (error) {
        return res.status(400).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400));
    }
};
const DeletedWorkplace = async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) {
        return res.status(404).send(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
    }
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