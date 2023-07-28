import { IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";

const CreateOneClass = async (payload: IClass) => {
    return await ClassRepository.CreateClass(payload)
}

const GetAllClass = async (page: number) => {
    return await ClassRepository.FindAllClass(page)
}

const GetClassById = async (id: string) => {
    return await ClassRepository.FindClassById(id)
}

const GetClassByCondition = async (filter: any, payload: IClass) => {
    return await ClassRepository.FindClassByCondition(filter, payload)
}

const UpdateOneClass = async (filter: any, payload: IClass) => {
    return await ClassRepository.UpdateOneClass(filter, payload)
}

const UpdateManyClass = async (filter: any, payload: IClass) => {
    return await ClassRepository.UpdateManyClass(filter, payload)
}

export default { CreateOneClass, GetAllClass, GetClassById, GetClassByCondition, UpdateOneClass, UpdateManyClass }