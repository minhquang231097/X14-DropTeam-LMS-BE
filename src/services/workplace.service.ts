import { WorkplaceRepository } from "@/repository/workplace.repo";
import { WorkplaceBody } from "@/types/workplace/workplace";

const CreateWorkplace = async (payload: WorkplaceBody) => {
    return await WorkplaceRepository.CreateOne(payload)
}

const GetAllWorkplace = async (page: number) => {
    return await WorkplaceRepository.GetAllWorkplace(page)
}

const FindWorkplaceByName = async (name: string) => {
    return await WorkplaceRepository.FindWorkplaceByName(name)
}

const FindWorkplaceById = async (id: string) => {
    return await WorkplaceRepository.FindWorkplaceById(id)
}

const FindWorkplaceByCode = async (workplace_code: string) => {
    return await WorkplaceRepository.FindWorkplaceByCode(workplace_code)
}

const UpdateWorkplace = async (id: string, payload: WorkplaceBody) => {
    return await WorkplaceRepository.UpdateWorkplace(id, payload)
}

const DeletedWorkplace = async (id: string) => {
    return await WorkplaceRepository.DeleteOneWorkplaceById(id)
}

export default { CreateWorkplace, GetAllWorkplace, FindWorkplaceByName, FindWorkplaceById, FindWorkplaceByCode, UpdateWorkplace, DeletedWorkplace }