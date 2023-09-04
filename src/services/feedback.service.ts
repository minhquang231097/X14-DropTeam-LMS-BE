import { FeedBack } from "@/models/feedback.model";
import { FeedbackRepository } from "@/repository/feedback.repo";
import courseService from "./course.service";
import userService from "./user.service";
import { CreateFeedbackDto, FindFeedbackDto, UpdateFeedbackDto } from "@/types/feedback";

const feedbackRepository = new FeedbackRepository(FeedBack);

const CreateFeedback = async (payload: CreateFeedbackDto) => {
  const newFeedback = await feedbackRepository.Create({
    course: payload.course_id,
    student: payload.student_id,
    rating: payload.rating,
    content: payload.content,
  });
  return newFeedback;
};

const GetAllSortedFeedback = async () => {
  return await feedbackRepository.Sort();
};

const GetTotalFeedback = async () => {
  return await feedbackRepository.Count();
};

const GetFeedbackById = async (id: string) => {
  return await feedbackRepository.FindById(id, [{ path: "course" }, "student"]);
};

const GetFeedbackByCourseId = async (course_id: string, page?: number, limit?: number, sortBy?: any) => {
  return await feedbackRepository.FindFeedbackByCourseId(course_id, page, limit, sortBy);
};

const GetFeedbackByStudentId = async (student_id: string, page?: number, limit?: number, sortBy?: any) => {
  return await feedbackRepository.FindFeedbackByStudentId(student_id, page, limit, sortBy);
};

const GetFeedbackByCondition = async (page: number, limit: number, sortBy: number) => {
  return await feedbackRepository.FindAllInfoAndPagination(page, limit, sortBy, [{ path: "course" }, "student"]);
};

const SearchFeedbackByCondition = async (searchTerm?: string, page?: number, limit?: number, sortBy?: any) => {
  const query = {
    $or: [
      { 'path:"course.course_code"': { $regex: searchTerm, $options: "i" } },
      { content: { $regex: searchTerm, $options: "i" } },
    ],
  };
  return await feedbackRepository.SearchByCondition(page, limit, query, sortBy, [{ path: "course" }, "student"]);
};

const UpdateFeedback = async (id: string, payload: UpdateFeedbackDto) => {
  return await feedbackRepository.FindByIdAndUpdate(id, payload);
};

const DeleteFeedbackById = async (id: string) => {
  return await feedbackRepository.DeleteOne(id);
};

const DeleteFeedbackByCondition = async (filter: FindFeedbackDto) => {
  return await feedbackRepository.DeleteByCondition(filter);
};

export default {
  CreateFeedback,
  GetFeedbackById,
  DeleteFeedbackByCondition,
  DeleteFeedbackById,
  UpdateFeedback,
  GetFeedbackByCondition,
  GetFeedbackByCourseId,
  GetFeedbackByStudentId,
  GetTotalFeedback,
  SearchFeedbackByCondition,
  GetAllSortedFeedback,
};
