import { Course, ICourse } from "@/models/course.model";
import { CourseRepository } from "@/repository/course.repo";
import { FindCourseDto } from "@/types/course";
import { ObjectId } from "mongoose";

const courseRepository = new CourseRepository(Course)

const CreateCourse = async (payload: ICourse) => {
    return await courseRepository.Create(payload)
}

const GetAllCourse = async (page: number, limit: number) => {
    return await courseRepository.FindAllInfoAndPagination(page, limit, "workplace")
}

const GetCourseById = async (id: ObjectId | string) => {
    return await courseRepository.FindById(id, "workplace")
}

const GetCourseByCode = async (code: string) => {
    return await courseRepository.FindCourseByCode(code)
}

const UpdateCourse = async (id: ObjectId | string, payload: ICourse) => {
    return await courseRepository.FindByIdAndUpdate(id, payload)
}

const UpdateManyCourse = async (filter: any, payload: ICourse) => {
    return await courseRepository.UpdateMany(filter, payload)
}

const DeletedCourse = async (id: ObjectId | string) => {
    return await courseRepository.DeleteOne(id)
}

export default { CreateCourse, GetAllCourse, GetCourseById, UpdateCourse, DeletedCourse, GetCourseByCode, UpdateManyCourse }