import { IWorkplace, Workplace } from "@/models/workplace.model";
import { WorkplaceRepository } from "@/repository/workplace.repo";
import { FindWorkplaceDto, UpdateWorkplaceDto } from "@/types/workplace";
import { ObjectId } from "mongoose";

const workplaceRepository = new WorkplaceRepository(Workplace)

const CreateWorkplace = async (payload: IWorkplace) => {
    return await workplaceRepository.Create(payload)
}

<<<<<<<< <Temporary merge branch 1
const GetAllWorkplace = async (page: number) => {
    return await WorkplaceRepository.GetAllWorkplace(page)
=========
const GetAllWorkplace = async (page: number, limit: number) => {
    return await workplaceRepository.FindAllInfoAndPagination(page, limit)
>>>>>>>>> Temporary merge branch 2
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

<<<<<<<<< Temporary merge branch 1
export default { CreateWorkplace, GetAllWorkplace, FindWorkplaceByName, FindWorkplaceById, FindWorkplaceByCode, UpdateWorkplace, DeletedWorkplace }
=========
const UpdateWorkplace = async (id: ObjectId | string, payload: UpdateWorkplaceDto) => {
    return await workplaceRepository.FindByIdAndUpdate(id, payload)
}

const DeletedWorkplace = async (id: string) => {
    return await workplaceRepository.DeleteOne(id)
}

export default { CreateWorkplace, GetWorkplaceByCodition, GetAllWorkplace, GetWorkplaceByName, GetWorkplaceById, UpdateWorkplace, DeletedWorkplace, GetWorkplaceByCode }