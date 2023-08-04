import { IWorkplace, Workplace } from "@/models/workplace.model";
import { WorkplaceRepository } from "@/repository/workplace.repo";
import { FindWorkplaceDto, UpdateWorkplaceDto } from "@/types/workplace";
import { ObjectId } from "mongoose";

const workplaceRepository = new WorkplaceRepository(Workplace)

const CreateWorkplace = async (payload: IWorkplace) => {
    return await workplaceRepository.Create(payload)
}

const GetAllWorkplace = async (page: number, limit: number) => {
    return await workplaceRepository.FindAllInfoAndPagination(page, limit)
}

const GetWorkplaceByName = async (name: string) => {
    return await workplaceRepository.FindByCondition({ name })
}

const GetWorkplaceById = async (id: string) => {
    return await workplaceRepository.FindById(id)
}

const GetWorkplaceByCode = async (code: string) => {
    return await workplaceRepository.FindWorkplaceByCode(code)
}

const GetWorkplaceByCodition = async (filter: FindWorkplaceDto) => {
    return await workplaceRepository.FindByCondition(filter)
}

const UpdateWorkplace = async (id: string, payload: any) => {
    return await workplaceRepository.FindByIdAndUpdate(id, payload)
}

const DeletedWorkplace = async (id: string) => {
    return await workplaceRepository.DeleteOne(id)
}

export default { CreateWorkplace, GetWorkplaceByCodition, GetAllWorkplace, GetWorkplaceByName, GetWorkplaceById, UpdateWorkplace, DeletedWorkplace, GetWorkplaceByCode }