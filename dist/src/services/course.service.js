"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = require("@/models/course.model");
const course_repo_1 = require("@/repository/course.repo");
const courseRepository = new course_repo_1.CourseRepository(course_model_1.Course);
const CreateCourse = async (payload) => {
    return await courseRepository.Create(payload);
};
const GetAllCourse = async (page, limit) => {
    return await courseRepository.FindAllInfoAndPagination(page, limit, "workplace");
};
const GetCourseById = async (id) => {
    return await courseRepository.FindById(id, "workplace");
};
const GetCourseByCode = async (code) => {
    return await courseRepository.FindCourseByCode(code);
};
const UpdateCourse = async (id, payload) => {
    return await courseRepository.FindByIdAndUpdate(id, payload);
};
const UpdateManyCourse = async (filter, payload) => {
    return await courseRepository.UpdateMany(filter, payload);
};
const DeletedCourse = async (id) => {
    return await courseRepository.DeleteOne(id);
};
exports.default = {
    CreateCourse,
    GetAllCourse,
    GetCourseById,
    UpdateCourse,
    DeletedCourse,
    GetCourseByCode,
    UpdateManyCourse,
};
//# sourceMappingURL=course.service.js.map