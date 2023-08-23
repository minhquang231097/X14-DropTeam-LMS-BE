import courseService from "./course.service";
import workplaceService from "./workplace.service";
import userService from "./user.service";
import { RegistedCourse } from "@/models/registe.course.model";
import { RegistedCourseRepository } from "@/repository/regist.course.repo";
import { RegistCourseDto } from "@/types/regist.course";
import { AddStudentToClassDto } from "@/types/class";

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
  return await registCourseRepository.FindRegistbyCourseId(course_id, page, limit);
};

const GetRegistByWorkplaceId = async (wp_id: string, page?: any, limit?: any) => {
  return await registCourseRepository.FindRegistbyWorkplaceId(wp_id, page, limit);
};

const GetRegistByStudentId = async (student_id: string, page?: any, limit?: any) => {
  return await registCourseRepository.FindRegistbyStudentId(student_id, page, limit);
};

const GetRegistById = async (id: string) => {
  return await registCourseRepository.FindById(id);
};

const GetRegistByCourseIdAndStudentId = async (course_id: string, student_id: string) => {
  return await registCourseRepository.FindByCondition({ course: course_id, student: student_id });
};

const SearchRegistByCondition = async (searchTerm?: string, page?: any, limit?: any) => {
  const query = {
    $or: [
      { fullname: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
      { phone_number: { $regex: searchTerm, $options: "i" } },
    ],
  };
  return await registCourseRepository.SearchByCondition(page, limit, query);
};

const UpdateRegist = async (id: string, payload: any) => {
  return await registCourseRepository.FindByIdAndUpdate(id, payload);
};

const DeleteRegist = async (id: string) => {
  return await registCourseRepository.DeleteOne(id);
};

const DeleteRegistAfterAdd = async (list: AddStudentToClassDto[]) => {
  list.map(async (el) => {
    return await registCourseRepository.DeleteByCondition({ student: el.student_id })
  })
}

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
  SearchRegistByCondition,
  DeleteRegistAfterAdd,
};
