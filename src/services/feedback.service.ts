import { FeedBack } from "@/models/feedback.model";
import { FeedbackRepository } from "@/repository/feedback.repo";
import courseService from "./course.service";
import userService from "./user.service";
import { FindFeedbackDto, UpdateFeedbackDto } from "@/types/feedback";

const feedbackRepository = new FeedbackRepository(FeedBack);

const CreateFeedback = async (
  course_code: string,
  email_student: string,
  payload: any,
) => {
  const [_course, _student] = await Promise.all([
    courseService.GetCourseByCode(course_code),
    userService.GetUserByEmail(email_student),
  ]);
  const newFeedback = await feedbackRepository.Create({
    ...payload,
    course: _course?._id,
    student: _student._id,
  });
  return newFeedback;
};

const GetFeedbackById = async (id: string) => {
  return await feedbackRepository.FindById(id, ["course", "student"]);
};

const GetFeedbackByCourseCode = async (code: string) => {
  const foundCourse: any = await courseService.GetCourseByCode(code);
  return await feedbackRepository.FindFeedbackByCourseId(foundCourse._id);
};

const GetFeedbackByEmailStudent = async (email: string) => {
  const foundUser: any = await userService.GetUserByEmail(email);
  return await feedbackRepository.FindFeedbackByStudentId(foundUser._id);
};

const GetFeedbackByCondition = async (page: number, limit: number) => {
  return await feedbackRepository.FindAllInfoAndPagination(page, limit, [
    "course",
    "student",
  ]);
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
  GetFeedbackByCourseCode,
  GetFeedbackByEmailStudent,
};
