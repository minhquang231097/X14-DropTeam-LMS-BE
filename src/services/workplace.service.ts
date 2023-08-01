import { IWorkplace, Workplace } from "@/models/workplace.model";
import { WorkplaceRepository } from "@/repository/workplace.repo";
import { ObjectId } from "mongoose";

const workplaceRepository = new WorkplaceRepository(Workplace)

const CreateWorkplace = async (payload: IWorkplace) => {
    return await workplaceRepository.Create(payload)
}

const GetAllWorkplace = async () => {
    return await workplaceRepository.FindAll()
}

const GetWorkplaceByName = async (name: string) => {
    return await workplaceRepository.FindByCondition({ name })
}

const GetWorkplaceById = async (id: ObjectId | string) => {
    return await workplaceRepository.FindById(id)
}

const GetWorkplaceByCode = async (code: string) => {
    return await workplaceRepository.FindWorkplaceByCode(code)
}

const UpdateWorkplace = async (id: ObjectId | string, payload: any) => {
    return await workplaceRepository.FindByIdAndUpdate(id, payload)
}

const DeletedWorkplace = async (id: ObjectId | string) => {
    return await workplaceRepository.DeleteOne(id)
}

export default { CreateWorkplace, GetAllWorkplace, GetWorkplaceByName, GetWorkplaceById, UpdateWorkplace, DeletedWorkplace, GetWorkplaceByCode }