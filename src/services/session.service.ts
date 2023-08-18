import { Session } from "@/models/session.model";
import { SessionRepository } from "@/repository/session.repo";
import courseService from "./course.service";
import { UpdateSessionDto } from "@/types/session";
import classService from "./class.service";

const sessionRepository = new SessionRepository(Session);

const CreateSession = async (course_code: string, class_code: string, payload: any) => {
  const [_course, _class] = await Promise.all([
    courseService.GetCourseByCode(course_code),
    classService.GetClassByCode(class_code),
  ]);
  const course_id = _course?._id;
  const class_id = _class?._id;
  return await sessionRepository.Create({
    course: course_id,
    class: class_id,
    session_code: payload.session_code,
    desc: payload.desc,
    status: payload.status,
  });
};

const CountSession = async () => {
  return await sessionRepository.Count();
};

const GetAllSession = async (page: number, limit: number) => {
  return await sessionRepository.FindAllInfoAndPagination(page, limit, ["course", "class"]);
};

const GetSessionById = async (id: string) => {
  return await sessionRepository.FindById(id, [[{ path: "course", populate: [{ path: "workplace" }] }], "class"]);
};


const GetSessionByCode = async (code: string) => {
  return await sessionRepository.FindByCondition({ course: code }, ["course", "class"]);
};

const GetSessionByClassCode = async (code: string, page?: any, limit?: any) => {
  const result = await classService.GetClassByCode(code);
  return await sessionRepository.FindSessionByClassId(result?._id, page, limit);
};

const GetSessionByCourseCode = async (code: string, page?: any, limit?: any) => {
  const result = await courseService.GetCourseByCode(code);
  return await sessionRepository.FindSessionByCourseId(result?._id, page, limit);
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
  GetSessionByCourseCode,
  UpdateSessionById,
  UpdateCourseByCondition,
  DeletedCourse,
  GetSessionByClassCode,
  GetSessionByCode,
  CountSession,
};
