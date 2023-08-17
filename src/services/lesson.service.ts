import { ILesson, Lesson } from "@/models/lesson.model";
import { LessonRepository } from "@/repository/lesson.repo";
import sessionService from "./session.service";
import { UpdateLessonDto } from "@/types/lesson";

const lessonRepository = new LessonRepository(Lesson);

const CreateLesson = async (session_code: string, payload: ILesson) => {
  const session = await sessionService.GetSessionByCode(session_code);
  return await lessonRepository.CreateLesson(session?._id, payload);
};

const CountLesson = async () => {
  return await lessonRepository.Count();
};

const GetAllLesson = async (page: number, limit: number) => {
  return await lessonRepository.FindAllInfoAndPagination(page, limit, [
    { path: "session", populate: [{ path: "class" }] },
  ]);
};

const GetLessonById = async (id: string) => {
  return await lessonRepository.FindById(id, {
    path: "session",
    populate: [{ path: "class" }],
  });
};

const GetLessonBySessionCode = async (ss_code: string, page: number, limit: number) => {
  const result = await sessionService.GetSessionByCode(ss_code);
  return await lessonRepository.FindLessonBySessionId(result?._id, page, limit);
};

const UpdateLessonById = async (id: string, payload: UpdateLessonDto) => {
  return await lessonRepository.FindByIdAndUpdate(id, payload);
};

const UpdateCourseByCondition = async (filter: any, payload: UpdateLessonDto) => {
  return await lessonRepository.UpdateMany(filter, payload);
};

const DeletedLessonById = async (id: string) => {
  return await lessonRepository.DeleteOne(id);
};

export default {
  CreateLesson,
  GetAllLesson,
  GetLessonById,
  GetLessonBySessionCode,
  UpdateLessonById,
  UpdateCourseByCondition,
  DeletedLessonById,
  CountLesson,
};
