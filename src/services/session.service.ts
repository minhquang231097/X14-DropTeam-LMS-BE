import { Session } from "@/models/session.model";
import { SessionRepository } from "@/repository/session.repo";
import courseService from "./course.service";
import { UpdateSessionDto } from "@/types/session";
import classService from "./class.service";

const sessionRepository = new SessionRepository(Session);

const CreateSession = async (course_code: string, payload: any) => {
  const course = await courseService.GetCourseByCode(course_code);
  const course_id = course?._id;
  return sessionRepository.CreateSession(course_id, payload);
};

const GetAllSession = async (page: number, limit: number) => {
  return await sessionRepository.FindAllInfoAndPagination(
    page,
    limit,
    "course",
  );
};

const GetSessionById = async (id: string) => {
  return await sessionRepository.FindById(id, "course");
};

const GetSessionByCode = async (code: string) => {
  return await sessionRepository.FindByCondition({ course: code }, "course");
};

const GetSessionByCourseId = async (id: string) => {
  return await sessionRepository.FindSessionByCourseId(id);
};

const GetSessionByCourseCode = async (code: string) => {
  const result = await courseService.GetCourseByCode(code);
  return await sessionRepository.FindSessionByCourseId(result?._id);
};

const UpdateSessionById = async (id: string, payload: UpdateSessionDto) => {
  return await sessionRepository.FindByIdAndUpdate(id, payload);
};

const UpdateCourseByCondition = async (
  filter: any,
  payload: UpdateSessionDto,
) => {
  return await sessionRepository.UpdateMany(filter, payload);
};

const DeletedCourse = async (id: string) => {
  return await sessionRepository.DeleteOne(id);
};

export default {
  CreateSession,
  GetAllSession,
  GetSessionById,
  GetSessionByCourseId,
  GetSessionByCourseCode,
  UpdateSessionById,
  UpdateCourseByCondition,
  DeletedCourse,
  GetSessionByCode,
};
