import { Course, ICourse } from "@/models/course.model";
import { CourseRepository } from "@/repository/course.repo";

const courseRepository = new CourseRepository(Course);

const CreateCourse = async (payload: ICourse) => {
  return await courseRepository.Create(payload);
};

const GetAllCourse = async (page: number, limit: number) => {
  return await courseRepository.FindAllInfoAndPagination(
    page,
    limit,
    "workplace",
  );
};

const GetCourseById = async (id: string) => {
  return await courseRepository.FindById(id, "workplace");
};

const GetCourseByCode = async (code: string) => {
  return await courseRepository.FindCourseByCode(code);
};

const SearchCourseByCondition = async (
  page: number,
  limit: number,
  searchTerm?: string,
) => {
  const query = {
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { course_code: { $regex: searchTerm, $options: "i" } },
    ],
  };
  return await courseRepository.SearchByCondition(page, limit, query);
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
};
