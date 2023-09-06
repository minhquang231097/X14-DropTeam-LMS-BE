import { IWorkplace, Workplace } from "@/models/workplace.model";
import { WorkplaceRepository } from "@/repository/workplace.repo";
import { FindWorkplaceDto } from "@/types/workplace";
import { sortBy } from "lodash";

const workplaceRepository = new WorkplaceRepository(Workplace);

const CreateWorkplace = async (payload: IWorkplace) => {
  return await workplaceRepository.Create(payload);
};

const GetAllWorkplace = async (page: number, limit: number, sortBy?: any) => {
  return await workplaceRepository.FindAllInfoAndPagination(page, limit, sortBy);
};

const GetWorkplaceByName = async (name: string) => {
  return await workplaceRepository.FindByCondition({ name });
};

const GetWorkplaceById = async (id: string) => {
  return await workplaceRepository.FindById(id);
};

const GetWorkplaceByCode = async (code: string) => {
  return await workplaceRepository.FindByCondition({ workplace_code: code });
};

const GetWorkplaceByCodition = async (filter: FindWorkplaceDto) => {
  return await workplaceRepository.FindByCondition(filter);
};

const UpdateWorkplace = async (id: string, payload: any) => {
  return await workplaceRepository.FindByIdAndUpdate(id, payload);
};

const DeletedWorkplace = async (id: string) => {
  return await workplaceRepository.DeleteOne(id);
};

const GetTotalWorkplace = async () => {
  return await workplaceRepository.Count();
};

const SearchWorkplaceByCondition = async (searchTerm?: string, page?: number, limit?: number, sortBy?: any) => {
  const query = {
    $or: [{ name: { $regex: searchTerm, $options: "i" } }, { workplace_code: { $regex: searchTerm, $options: "i" } }],
  };
  return await workplaceRepository.SearchByCondition(page, limit, query, sortBy);
};

const GetWorkplaceByStatus = async (status: string, page?: number, limit?: number, sortBy?: any) => {
  return await workplaceRepository.FindByConditionAndPagination({ status }, page, limit, sortBy);
};

export default {
  CreateWorkplace,
  GetWorkplaceByCodition,
  GetAllWorkplace,
  GetWorkplaceByName,
  GetWorkplaceById,
  UpdateWorkplace,
  DeletedWorkplace,
  GetWorkplaceByCode,
  GetTotalWorkplace,
  SearchWorkplaceByCondition,
  GetWorkplaceByStatus,
};
