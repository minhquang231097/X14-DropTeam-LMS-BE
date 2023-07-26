import { IWorkplace } from "@/models/workplace.model";
import { WorkplaceRepository } from "@/repository/workplace.repo";

const CreateWorkplace = async (payload: IWorkplace) => {
    return await WorkplaceRepository.CreateOne(payload)
}

const GetAllWorkplace = async () => {
    return await WorkplaceRepository.GetAllWorkplace()
}

const FindWorkplaceByName = async (name: string) => {
    return await WorkplaceRepository.FindWorkplaceByName(name)
}

const FindWorkplaceById = async (id: string) => {
    return await WorkplaceRepository.FindWorkplaceById(id)
}

const UpdateWorkplace = async (id: string, payload: any) => {
    return await WorkplaceRepository.UpdateWorkplace(id, payload)
}

const DeletedWorkplace = async (id: string) => {
    return await WorkplaceRepository.DeleteOneWorkplaceById(id)
}

export default { CreateWorkplace, GetAllWorkplace, FindWorkplaceByName, FindWorkplaceById, UpdateWorkplace, DeletedWorkplace }