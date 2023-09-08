import { Course, ICourse } from "@/models/course.model";
import { CourseRepository } from "@/repository/course.repo";
import { CreateCourseDto } from "@/types/course";

const courseRepository = new CourseRepository(Course);

const CreateCourse = async (payload: CreateCourseDto) => {
  return await courseRepository.Create(payload);
};

const GetAllCourse = async (page: number, limit: number, sortBy?: any) => {
  return await courseRepository.FindAllInfoAndPagination(page, limit, sortBy);
};

const GetCourseById = async (id: string) => {
  return await courseRepository.FindById(id);
};

const GetCourseByCode = async (code: string) => {
  return await courseRepository.FindCourseByCode(code);
};

const GetTotalCourse = async () => {
  return await courseRepository.Count();
};

const SearchCourseByCondition = async (searchTerm?: string, page?: any, limit?: any, sortBy?: any) => {
  const query = {
    $or: [{ title: { $regex: searchTerm, $options: "i" } }, { course_code: { $regex: searchTerm, $options: "i" } }, { level: { $regex: searchTerm, $options: "i" } }],
  };
  return await courseRepository.SearchByCondition(page, limit, query, sortBy);
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
