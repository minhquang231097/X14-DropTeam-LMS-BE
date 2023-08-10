"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_model_1 = require("@/models/lesson.model");
const lesson_repo_1 = require("@/repository/lesson.repo");
const session_service_1 = __importDefault(require("./session.service"));
const lessonRepository = new lesson_repo_1.LessonRepository(lesson_model_1.Lesson);
const CreateLesson = async (session_code, payload) => {
    const session = await session_service_1.default.GetSessionByCode(session_code);
    return await lessonRepository.CreateLesson(session?._id, payload);
};
const GetAllLesson = async (page, limit) => {
    return await lessonRepository.FindAllInfoAndPagination(page, limit, "session");
};
const GetLessonById = async (id) => {
    return await lessonRepository.FindById(id, "session");
};
const GetLessonBySessionCode = async (code, page, limit) => {
    const result = await session_service_1.default.GetSessionByCode(code);
    return await lessonRepository.FindLessonBySessionId(result?._id, page, limit);
};
const UpdateLessonById = async (id, payload) => {
    return await lessonRepository.FindByIdAndUpdate(id, payload);
};
const UpdateCourseByCondition = async (filter, payload) => {
    return await lessonRepository.UpdateMany(filter, payload);
};
const DeletedLessonById = async (id) => {
    return await lessonRepository.DeleteOne(id);
};
exports.default = {
    CreateLesson,
    GetAllLesson,
    GetLessonById,
    GetLessonBySessionCode,
    UpdateLessonById,
    UpdateCourseByCondition,
    DeletedLessonById,
};
//# sourceMappingURL=lesson.service.js.map