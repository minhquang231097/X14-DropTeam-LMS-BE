import { Class, IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";
import { CourseRepository } from "@/repository/course.repo";
import { UserRepository } from "@/repository/user.repo";
import { WorkplaceRepository } from "@/repository/workplace.repo";
import { UpdateClassDto } from "@/types/class";
import { ObjectId } from "mongoose";
import courseService from "./course.service";
import userService from "./user.service";
import workplaceService from "./workplace.service";

const classRepository = new ClassRepository(Class)

const CreateOneClass = async (email_mentor: string, workplace_code: string, course_code: string, payload: IClass) => {
    const _mentor = await userService.FindUserByEmail(email_mentor)
    const _workplace = await workplaceService.FindWorkplaceByCode(workplace_code)
    const _course = await courseService.FindCourseByCode(course_code)
    const id_mentor = _mentor?._id
    const id_workplace = _workplace?._id
    const id_course = _course?._id
    return await classRepository.CreateClass(id_mentor, id_workplace, id_course, payload)
}

const GetAllClass = async (page: number, limit: number) => {
    return await classRepository.FindAllAndPagination(page, limit)
}

const GetClassById = async (id: ObjectId | string) => {
    return await classRepository.FindById(id)
}

const GetClassByCode = async (code: string) => {
    return await classRepository.FindClassByCode(code)
}

const GetClassByMentorId = async (id: ObjectId | string) => {
    return await classRepository.FindClassByMentorId(id)
}

const GetClassByWorkplaceId = async (id: ObjectId | string) => {
    return await classRepository.FindClassByWorkplaceId(id)
}

const GetClassByCourseId = async (code: string) => {
    return await classRepository.FindClassByCourseId(code)
}

const GetClassByCondition = async (filter: IClass) => {
    return await classRepository.FindByCondition(filter)
}

const UpdateOneClass = async (id: ObjectId | string, payload: UpdateClassDto) => {
    return await classRepository.FindByIdAndUpdate(id, payload)
}

const UpdateManyClass = async (filter: UpdateClassDto, payload: UpdateClassDto) => {
    return await classRepository.UpdateMany(filter, payload)
}

const DeleteClassById = async (id: ObjectId | string) => {
    return await classRepository.DeleteOne(id)
}

const DeleteClassByCondition = async (filter: UpdateClassDto) => {
    return await classRepository.DeleteByCondition(filter)
}

export default { CreateOneClass, GetAllClass, GetClassById, GetClassByMentorId, GetClassByWorkplaceId, GetClassByCourseId, GetClassByCondition, UpdateOneClass, UpdateManyClass, DeleteClassById, DeleteClassByCondition, GetClassByCode }