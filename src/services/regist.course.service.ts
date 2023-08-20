import courseService from "./course.service";
import workplaceService from "./workplace.service";
import userService from "./user.service";
import { RegistedCourse } from "@/models/registe.course.model";
import { RegistedCourseRepository } from "@/repository/regist.course.repo";
import { RegistCourseDto } from "@/types/regist.course";

const registCourseRepository = new RegistedCourseRepository(RegistedCourse);

const CreateRegistCourse = async (payload: RegistCourseDto) => {
  const { student_id } = payload;
  const _student = await userService.GetUserById(student_id);
  return await registCourseRepository.Create({
    fullname: _student.fullname,
    email: _student.email,
    phone_number: _student.phone_number,
    course: payload.course_id,
    workplace: payload.workplace_id,
    note: payload.note,
    student: _student._id,
  });
};

const GetTotalRegist = async () => {
  return await registCourseRepository.Count();
};

const GetAllRegist = async (page: number, limit: number) => {
  return await registCourseRepository.FindAllInfoAndPagination(page, limit);
};

const GetRegistByCourseId = async (course_id: string, page?: any, limit?: any) => {
  const _course = await courseService.GetCourseById(course_id);
  return await registCourseRepository.FindRegistbyCourseId(_course?._id, page, limit);
};

const GetRegistByWorkplaceId = async (wp_id: string, page?: any, limit?: any) => {
  const _workplace = await workplaceService.GetWorkplaceById(wp_id);
  return await registCourseRepository.FindRegistbyWorkplaceId(_workplace?._id, page, limit);
};

const GetRegistByStudentId = async (student_id: string, page?: any, limit?: any) => {
  const _student = await userService.GetUserById(student_id);
  return await registCourseRepository.FindRegistbyStudentId(_student?._id, page, limit);
};

const GetRegistById = async (id: string) => {
  return await registCourseRepository.FindById(id);
};

const GetRegistByCourseIdAndStudentId = async (course_id: string, student_id: string) => {
  return await registCourseRepository.FindByCondition({ course: course_id, student: student_id });
};

const UpdateRegist = async (id: string, payload: any) => {
  return await registCourseRepository.FindByIdAndUpdate(id, payload);
};

const DeleteRegist = async (id: string) => {
  return await registCourseRepository.DeleteOne(id);
};

export default {
  DeleteRegist,
  UpdateRegist,
  CreateRegistCourse,
  GetRegistByCourseId,
  GetRegistByWorkplaceId,
  GetRegistByStudentId,
  GetAllRegist,
  GetRegistById,
  GetTotalRegist,
  GetRegistByCourseIdAndStudentId,
};
