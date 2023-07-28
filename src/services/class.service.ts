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

const GetClassByCode = async (class_code: string) => {
    return await ClassRepository.FindClassById(class_code)
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

const DeletedClass =async (id:string) => {
    return await ClassRepository.DeleteClassById(id)
}

export default { CreateOneClass, GetAllClass, GetClassById,GetClassByCode ,GetClassByCondition, UpdateOneClass, UpdateManyClass,DeletedClass }