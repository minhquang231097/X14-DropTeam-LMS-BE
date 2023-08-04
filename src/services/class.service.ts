import { Class, IClass } from "@/models/class.model";
import { ClassRepository } from "@/repository/class.repo";
import { UpdateClassDto } from "@/types/class";
import { ObjectId } from "mongoose";
import courseService from "./course.service";
import userService from "./user.service";
import workplaceService from "./workplace.service";

const classRepository = new ClassRepository(Class)

const CreateOneClass = async (email_mentor: string, workplace_code: string, course_code: string, payload: IClass) => {
    const _mentor = await userService.GetUserByEmail(email_mentor)
    const _workplace = await workplaceService.GetWorkplaceByCode(workplace_code)
    const _course = await courseService.GetCourseByCode(course_code)
    const id_mentor = _mentor?._id
    const id_workplace = _workplace?._id
    const id_course = _course?._id
    return await classRepository.CreateClass(id_mentor, id_workplace, id_course, payload)
}

const GetAllClass = async (page: number, limit: number) => {
    return await classRepository.FindAllInfoAndPagination(page, limit, ["mentor", "workplace", "course"])
}

const GetClassById = async (id: string) => {
    return await classRepository.FindById(id, ["mentor", "workplace", "course"])
}

const GetClassByCode = async (code: string) => {
    return await classRepository.FindClassByCode(code)
}

const GetClassByMentorId = async (id: string) => {
    return await classRepository.FindClassByMentorId(id)
}

const GetClassByWorkplaceId = async (id: string) => {
    return await classRepository.FindClassByWorkplaceId(id)
}

const GetClassByCourseId = async (code: string) => {
    return await classRepository.FindClassByCourseId(code)
}

const GetClassByCondition = async (filter: IClass) => {
    return await classRepository.FindByCondition(filter, ["mentor", "workplace", "course"])
}

const UpdateOneClass = async (id: string, payload: UpdateClassDto) => {
    return await classRepository.FindByIdAndUpdate(id, payload)
}

const UpdateManyClass = async (filter: UpdateClassDto, payload: UpdateClassDto) => {
    return await classRepository.UpdateMany(filter, payload)
}

const DeleteClassById = async (id: string) => {
    return await classRepository.DeleteOne(id)
}

const DeleteClassByCondition = async (filter: UpdateClassDto) => {
    return await classRepository.DeleteByCondition(filter)
}

export default { CreateOneClass, GetAllClass, GetClassById, GetClassByMentorId, GetClassByWorkplaceId, GetClassByCourseId, GetClassByCondition, UpdateOneClass, UpdateManyClass, DeleteClassById, DeleteClassByCondition, GetClassByCode }