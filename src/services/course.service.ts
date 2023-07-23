import { CourseRepository } from "@/repository/course.repo";
import { CourseBody } from "@/types/course/course";

const CreateCourse = async (payload: CourseBody) => {
    return await CourseRepository.CreateOne(payload)
}

const GetAllCourse = async () => {
    return await CourseRepository.GetAllCourse()
}

const FindCourseByName = async (name: string) => {
    return await CourseRepository.FindCourseByName(name)
}

const FindCourseById = async (id: string) => {
    return await CourseRepository.FindCourseById(id)
}

const UpdateCourse = async (id: string, payload: any) => {
    return await CourseRepository.UpdateCourse(id, payload)
}

const DeletedCourse = async (id: string) => {
    return await CourseRepository.DeleteOneCourseById(id)
}

export default { CreateCourse, GetAllCourse, FindCourseByName, FindCourseById, UpdateCourse, DeletedCourse }