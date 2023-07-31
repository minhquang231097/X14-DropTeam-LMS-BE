import { IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";
import { CourseRepository } from "@/repository/course.repo";
import { UserRepository } from "@/repository/user.repo";
import { WorkplaceRepository } from "@/repository/workplace.repo";
import { UpdateClassDto } from "@/types/class";
import { ObjectId } from "mongoose";

const CreateOneClass = async (email_mentor: string, workplace_code: string, course_code: string, payload: IClass) => {
    const _mentor = await UserRepository.FindUserByEmail(email_mentor)
    const _workplace = await WorkplaceRepository.FindWorkplaceByCode(workplace_code)
    const _course = await CourseRepository.FindCourseByCode(course_code)
    const id_mentor = _mentor?._id
    const id_workplace = _workplace?._id
    const id_course = _course?._id
    return await ClassRepository.CreateClass(id_mentor, id_workplace, id_course, payload)
}

const GetAllClass = async (page: number, limit: number) => {
    return await ClassRepository.FindAllClass(page, limit)
}

const GetClassById = async (id: ObjectId | string) => {
    return await ClassRepository.FindClassById(id)
}

const GetClassByCode = async (code: string) => {
    return await ClassRepository.FindClassByCode(code)
}

const GetClassByCondition = async (filter: IClass, payload: IClass) => {
    return await ClassRepository.FindClassByCondition(filter, payload)
}

const UpdateOneClass = async (id: ObjectId | string, payload: IClass) => {
    return await ClassRepository.UpdateOneClass(id, payload)
}

const UpdateManyClass = async (filter: UpdateClassDto, payload: IClass) => {
    return await ClassRepository.UpdateManyClass(filter, payload)
}

const DeleteClassById = async (id: ObjectId | string) => {
    return await ClassRepository.DeleteClassById(id)
}

const DeleteClassByCondition = async (filter: UpdateClassDto) => {
    return await ClassRepository.DeleteClassByCondition(filter)
}

export default { CreateOneClass, GetAllClass, GetClassById, GetClassByCondition, UpdateOneClass, UpdateManyClass, DeleteClassById, DeleteClassByCondition, GetClassByCode }