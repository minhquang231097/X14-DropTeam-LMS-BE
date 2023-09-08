import { Session } from "@/models/session.model";
import { SessionRepository } from "@/repository/session.repo";
import { CreateSessionDto, UpdateSessionDto } from "@/types/session";

const sessionRepository = new SessionRepository(Session);

const CreateSession = async (payload: CreateSessionDto) => {
  return await sessionRepository.Create({
    course: payload.course_id,
    class: payload.class_id,
    session_code: payload.session_code,
    desc: payload.desc,
    status: payload.status,
  });
};

const CountSession = async () => {
  return await sessionRepository.Count();
};

const GetAllSession = async (page: number, limit: number, sortBy?: any) => {
  return await sessionRepository.FindAllInfoAndPagination(page, limit, sortBy, ["course", "class"]);
};

const GetSessionById = async (id: string) => {
  return await sessionRepository.FindById(id, [[{ path: "course" }], "class"]);
};

const GetSessionByCode = async (code: string) => {
  return await sessionRepository.FindByCondition({ session_code: code }, ["course", "class"]);
};

const GetSessionByClassId = async (class_id: string, page?: number, limit?: number, sortBy?: any) => {
  return await sessionRepository.FindSessionByClassId(class_id, page, limit, sortBy);
};

const GetSessionByCourseId = async (course_id: string, page?: number, limit?: number, sortBy?: any) => {
  return await sessionRepository.FindSessionByCourseId(course_id, page, limit, sortBy);
};

const SearchSessionByCondition = async (searchTerm?: string, page?: number, limit?: number, sortBy?: any) => {
  const query = {
    $or: [{ session_code: { $regex: searchTerm, $options: "i" } }, { desc: { $regex: searchTerm, $options: "i" } }],
  };
  return await sessionRepository.SearchByCondition(page, limit, query, sortBy, ["course", "class"]);
};

const UpdateSessionById = async (id: string, payload: UpdateSessionDto) => {
  return await sessionRepository.FindByIdAndUpdate(id, payload);
};

const UpdateCourseByCondition = async (filter: any, payload: UpdateSessionDto) => {
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
  UpdateSessionById,
  UpdateCourseByCondition,
  DeletedCourse,
  GetSessionByClassId,
  GetSessionByCode,
  CountSession,
  SearchSessionByCondition,
};
