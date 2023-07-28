import { IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";

const CreateClass = async (payload: IClass) => {
    return await ClassRepository.CreateOne(payload)
}

const GetAllClass = async (page: number) => {
    return await ClassRepository.GetAllClass(page)
}

const FindClassByName = async (name: string) => {
    return await ClassRepository.FindClassByName(name)
}

const FindClassById = async (id: string) => {
    return await ClassRepository.FindClassById(id)
}

const FindClassByCode = async (class_code: string) => {
    return await ClassRepository.FindClassByCode(class_code)
}

const UpdateClass = async (id: string, payload: IClass) => {
    return await ClassRepository.UpdateClass(id, payload)
}

const DeletedClass = async (id: string) => {
    return await ClassRepository.DeleteOneClassById(id)
}

export default { CreateClass, GetAllClass, FindClassByName, FindClassById, FindClassByCode, UpdateClass, DeletedClass }