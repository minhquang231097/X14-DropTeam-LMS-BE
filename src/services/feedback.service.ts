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

const GetTotalFeedback = async () => {
  return await feedbackRepository.Count();
};

const GetFeedbackById = async (id: string) => {
  return await feedbackRepository.FindById(id, [{ path: "course" }, "student"]);
};

const GetFeedbackByCourseId = async (course_id: string, page?: any, limit?: any) => {
  return await feedbackRepository.FindFeedbackByCourseId(course_id, page, limit);
};

const GetFeedbackByStudentId = async (student_id: string, page?: any, limit?: any) => {
  return await feedbackRepository.FindFeedbackByStudentId(student_id, page, limit);
};

const GetFeedbackByCondition = async (page: number, limit: number) => {
  return await feedbackRepository.FindAllInfoAndPagination(page, limit, [{ path: "course" }, "student"]);
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
};
