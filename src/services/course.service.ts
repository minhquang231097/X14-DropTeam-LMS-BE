import { Course, ICourse } from "@/models/course.model";
import { CourseRepository } from "@/repository/course.repo";
import workplaceService from "./workplace.service";
import { FindWorkplaceDto } from "@/types/workplace";

const courseRepository = new CourseRepository(Course);

const CreateCourse = async (workplace_code: string, payload: ICourse) => {
  const _workplace: any = await workplaceService.GetWorkplaceByCode(workplace_code);
  return await courseRepository.Create({
    ...payload,
    workplace: _workplace?._id,
  });
};

const GetAllCourse = async (page: number, limit: number) => {
  return await courseRepository.FindAllInfoAndPagination(page, limit, "workplace");
};

const GetCourseById = async (id: string) => {
  return await courseRepository.FindById(id, "workplace");
};

const GetCourseByCode = async (code: string) => {
  return await courseRepository.FindCourseByCode(code);
};

const GetTotalCourse = async () => {
  return await courseRepository.Count();
};

const SearchCourseByCondition = async (searchTerm?: string, page?: any, limit?: any) => {
  const query = {
    $or: [{ title: { $regex: searchTerm, $options: "i" } }, { course_code: { $regex: searchTerm, $options: "i" } }],
  };
  return await courseRepository.SearchByCondition(page, limit, query, "workplace");
};

const UpdateCourse = async (id: string, payload: ICourse) => {
  return await courseRepository.FindByIdAndUpdate(id, payload);
};

const UpdateManyCourse = async (filter: any, payload: ICourse) => {
  return await courseRepository.UpdateMany(filter, payload);
};

const DeletedCourse = async (id: string) => {
  return await courseRepository.DeleteOne(id);
};

export default {
  CreateCourse,
  GetAllCourse,
  GetCourseById,
  SearchCourseByCondition,
  UpdateCourse,
  DeletedCourse,
  GetCourseByCode,
  UpdateManyCourse,
  GetTotalCourse,
};
