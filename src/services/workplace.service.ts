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

const UpdateWorkplace = async (id: string) => {
    return await WorkplaceRepository.UpdateWorkplace(id)
}

export default { CreateWorkplace, GetAllWorkplace, FindWorkplaceByName, UpdateWorkplace }