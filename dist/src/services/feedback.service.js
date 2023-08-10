"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_model_1 = require("@/models/feedback.model");
const feedback_repo_1 = require("@/repository/feedback.repo");
const course_service_1 = __importDefault(require("./course.service"));
const user_service_1 = __importDefault(require("./user.service"));
const feedbackRepository = new feedback_repo_1.FeedbackRepository(feedback_model_1.FeedBack);
const CreateFeedback = async (course_code, email_student, payload) => {
    const [_course, _student] = await Promise.all([
        course_service_1.default.GetCourseByCode(course_code),
        user_service_1.default.GetUserByEmail(email_student),
    ]);
    const newFeedback = await feedbackRepository.Create({
        ...payload,
        course: _course?._id,
        student: _student._id,
    });
    return newFeedback;
};
const GetFeedbackById = async (id) => {
    return await feedbackRepository.FindById(id, ["course", "student"]);
};
const GetFeedbackByCourseCode = async (code) => {
    const foundCourse = await course_service_1.default.GetCourseByCode(code);
    return await feedbackRepository.FindFeedbackByCourseId(foundCourse._id);
};
const GetFeedbackByEmailStudent = async (email) => {
    const foundUser = await user_service_1.default.GetUserByEmail(email);
    return await feedbackRepository.FindFeedbackByStudentId(foundUser._id);
};
const GetFeedbackByCondition = async (page, limit) => {
    return await feedbackRepository.FindAllInfoAndPagination(page, limit, [
        "course",
        "student",
    ]);
};
const UpdateFeedback = async (id, payload) => {
    return await feedbackRepository.FindByIdAndUpdate(id, payload);
};
const DeleteFeedbackById = async (id) => {
    return await feedbackRepository.DeleteOne(id);
};
const DeleteFeedbackByCondition = async (filter) => {
    return await feedbackRepository.DeleteByCondition(filter);
};
exports.default = {
    CreateFeedback,
    GetFeedbackById,
    DeleteFeedbackByCondition,
    DeleteFeedbackById,
    UpdateFeedback,
    GetFeedbackByCondition,
    GetFeedbackByCourseCode,
    GetFeedbackByEmailStudent,
};
//# sourceMappingURL=feedback.service.js.map