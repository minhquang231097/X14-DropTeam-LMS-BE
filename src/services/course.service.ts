import { CourseRepository } from "@/repository/course.repo";
import { CourseBody } from "@/types/course/course";

const CreateCourse = async (payload: CourseBody) => {
    return await CourseRepository.CreateOne(payload)
}

const GetAllCourse = async (page: number) => {
    return await CourseRepository.GetAllCourse(page)
}

const FindCourseByName = async (name: string) => {
    return await CourseRepository.FindCourseByName(name)
}

const FindCourseById = async (id: string) => {
    return await CourseRepository.FindCourseById(id)
}

const FindCourseByCode = async (course_code: string) => {
    return await CourseRepository.FindCourseByCode(course_code)
}

const UpdateCourse = async (id: string, payload: any) => {
    return await CourseRepository.UpdateCourse(id, payload)
}

const DeletedCourse = async (id: string) => {
    return await CourseRepository.DeleteOneCourseById(id)
}

export default { CreateCourse, GetAllCourse, FindCourseByName, FindCourseById, FindCourseByCode, UpdateCourse, DeletedCourse }