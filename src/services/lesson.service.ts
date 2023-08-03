import { ILesson, Lesson } from "@/models/lesson.model";
import { LessonRepository } from "@/repository/lesson.repo";
import sessionService from "./session.service";
import { ObjectId } from "mongoose";
import { UpdateLessonDto } from "@/types/lesson";

const lessonRepository = new LessonRepository(Lesson)

const CreateLesson = async (session_code: string, payload: ILesson) => {
    const session = await sessionService.GetSessionByCode(session_code)
    return await lessonRepository.CreateLesson(session?._id, payload)
}

const GetAllLesson = async (page: number, limit: number) => {
    return await lessonRepository.FindAllInfoAndPagination(page, limit, "session")
}

const GetLessonById = async (id: ObjectId | string) => {
    return await lessonRepository.FindById(id, "session")
}

const GetLessonBySessionId = async (id: ObjectId | string) => {
    return await lessonRepository.FindLessonBySessionId(id)
}

const UpdateLessonById = async (id: ObjectId | string, payload: UpdateLessonDto) => {
    return await lessonRepository.FindByIdAndUpdate(id, payload)
}

const UpdateCourseByCondition = async (filter: any, payload: UpdateLessonDto) => {
    return await lessonRepository.UpdateMany(filter, payload)
}

const DeletedLessonById = async (id: ObjectId | string) => {
    return await lessonRepository.DeleteOne(id)
}

export default { CreateLesson, GetAllLesson, GetLessonById, GetLessonBySessionId, UpdateLessonById, UpdateCourseByCondition, DeletedLessonById }