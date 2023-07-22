import { WorkplaceRepository } from "@/repository/workplace.repo";
import { WorkplaceBody } from "@/types/workplace/workplace";

const CreateWorkplace = async (payload: WorkplaceBody) => {
    const workplace = await WorkplaceRepository.CreateOne({
        name: payload.name,
        address: payload.address,
        status: payload.status,
        workplace_code: payload.workplace_code,
    })
    return workplace
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

export default { CreateWorkplace, GetAllWorkplace, FindWorkplaceByName, FindWorkplaceById, UpdateWorkplace }