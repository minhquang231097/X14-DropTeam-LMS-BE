"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workplace_model_1 = require("@/models/workplace.model");
const workplace_repo_1 = require("@/repository/workplace.repo");
const workplaceRepository = new workplace_repo_1.WorkplaceRepository(workplace_model_1.Workplace);
const CreateWorkplace = async (payload) => {
    return await workplaceRepository.Create(payload);
};
const GetAllWorkplace = async (page, limit) => {
    return await workplaceRepository.FindAllInfoAndPagination(page, limit);
};
const GetWorkplaceByName = async (name) => {
    return await workplaceRepository.FindByCondition({ name });
};
const GetWorkplaceById = async (id) => {
    return await workplaceRepository.FindById(id);
};
const GetWorkplaceByCode = async (code) => {
    return await workplaceRepository.FindWorkplaceByCode(code);
};
const GetWorkplaceByCodition = async (filter) => {
    return await workplaceRepository.FindByCondition(filter);
};
const UpdateWorkplace = async (id, payload) => {
    return await workplaceRepository.FindByIdAndUpdate(id, payload);
};
const DeletedWorkplace = async (id) => {
    return await workplaceRepository.DeleteOne(id);
};
exports.default = {
    CreateWorkplace,
    GetWorkplaceByCodition,
    GetAllWorkplace,
    GetWorkplaceByName,
    GetWorkplaceById,
    UpdateWorkplace,
    DeletedWorkplace,
    GetWorkplaceByCode,
};
//# sourceMappingURL=workplace.service.js.map