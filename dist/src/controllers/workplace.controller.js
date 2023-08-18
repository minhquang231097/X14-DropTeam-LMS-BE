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
    try {
        const workplace = await workplace_service_1.default.CreateWorkplace(req.body);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.CREATE_SUCCES, 200, workplace));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
    }
};
const GetWorkplace = async (req, res) => {
    const { page, limit, id, code, search } = req.query;
    const p = Number(page);
    const l = Number(limit);
    try {
        const countDoc = await workplace_service_1.default.GetTotalWorkplace();
        if (id) {
            const result = await workplace_service_1.default.GetWorkplaceById(id);
            if (!result)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result));
        }
        else if (code) {
            const result = await workplace_service_1.default.GetWorkplaceByCode(code);
            if (!result)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, result));
        }
        else if (search) {
            const num = await workplace_service_1.default.SearchWorkplaceByCondition(search);
            const result = await workplace_service_1.default.SearchWorkplaceByCondition(search, p, l);
            if (!result)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, {
                list: result,
                page: p,
                count: result.length,
                total: countDoc,
                total_page: Math.ceil(num.length / l),
            }));
        }
        else if (page && limit) {
            const result = await workplace_service_1.default.GetAllWorkplace(p, l);
            if (!result)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, {
                list: result,
                page: p,
                count: result.length,
                total: countDoc,
                total_page: Math.ceil(countDoc / l),
            }));
        }
        else {
            const result = await workplace_service_1.default.GetAllWorkplace(1, 10);
            if (!result)
                return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 404));
            return res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.FOUND_SUCCESS, 200, {
                list: result,
                page: 1,
                count: result.length,
                total: countDoc,
            }));
        }
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 404));
    }
};
const UpdateWorkplace = async (req, res) => {
    const { id } = req.query;
    const update = req.body;
    try {
        const workplaceExist = await workplace_service_1.default.GetWorkplaceById(id);
        if (!workplaceExist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400));
        }
        const updateWorkplace = await workplace_service_1.default.UpdateWorkplace(id, update);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.UPDATE_SUCCESS, 200, updateWorkplace));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
    }
};
const DeletedWorkplace = async (req, res) => {
    const { id } = req.query;
    try {
        const workplaceExist = await workplace_service_1.default.GetWorkplaceById(id);
        if (!workplaceExist) {
            return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.NOT_FOUND, 400));
        }
        const deleteWorkplace = await workplace_service_1.default.DeletedWorkplace(id);
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.DELETE_SUCCESS, 200, deleteWorkplace));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WRONG, 400, error.message));
    }
};
exports.default = {
    CreateWorkplace,
    GetWorkplace,
    UpdateWorkplace,
    DeletedWorkplace,
};
//# sourceMappingURL=workplace.controller.js.map