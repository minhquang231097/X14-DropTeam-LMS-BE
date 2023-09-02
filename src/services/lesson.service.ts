import { Lesson } from "@/models/lesson.model";
import { LessonRepository } from "@/repository/lesson.repo";
import { CreateLessonDto, UpdateLessonDto } from "@/types/lesson";
import sessionService from "./session.service";
import courseService from "./course.service";

const lessonRepository = new LessonRepository(Lesson);

const CreateLesson = async (payload: CreateLessonDto) => {
  return await lessonRepository.Create({
    course: payload.course_id,
    title: payload.title,
    content: payload.content,
    no: payload.no,
  });
};

const CountLesson = async () => {
  return await lessonRepository.Count();
};

const GetAllLesson = async (page: number, limit: number) => {
  return await lessonRepository.FindAllInfoAndPagination(page, limit, "course");
};

const GetLessonById = async (id: string) => {
  return await lessonRepository.FindById(id, "course");
};
const GetLessonByCourseId = async (course_id: string, page?: any, limit?: any) => {
  return await lessonRepository.FindLessonByCourseId(course_id, page, limit);
};

const SearchLessonByCondition = async (searchTerm?: string, page?: any, limit?: any) => {
  const query = {
    $or: [{ title: { $regex: searchTerm, $options: "i" } }],
  };
  return await lessonRepository.SearchByCondition(page, limit, query);
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
  GetLessonByCourseId,
  UpdateLessonById,
  UpdateCourseByCondition,
  DeletedLessonById,
  CountLesson,
  SearchLessonByCondition,
};
