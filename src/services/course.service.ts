import { ICourse } from "@/models/course.model";
import { CourseRepository } from "@/repository/course.repo";
import { ObjectId } from "mongoose";

const CreateCourse = async (payload: ICourse) => {
    return await CourseRepository.CreateOne(payload)
}

const GetAllCourse = async (page: number, limit: number) => {
    return await CourseRepository.GetAllCourse(page, limit)
}

const FindCourseByName = async (name: string) => {
    return await CourseRepository.FindCourseByName(name)
}

const FindCourseById = async (id: ObjectId | string) => {
    return await CourseRepository.FindCourseById(id)
}

const FindCourseByCode = async (code: string) => {
    return await CourseRepository.FindCourseByCode(code)
}

const UpdateCourse = async (id: ObjectId | string, payload: ICourse) => {
    return await CourseRepository.UpdateCourse(id, payload)
}

const DeletedCourse = async (id: ObjectId | string) => {
    return await CourseRepository.DeleteOneCourseById(id)
}

export default { CreateCourse, GetAllCourse, FindCourseByName, FindCourseById, UpdateCourse, DeletedCourse, FindCourseByCode }