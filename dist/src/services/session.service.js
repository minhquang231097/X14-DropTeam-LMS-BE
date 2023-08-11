"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_model_1 = require("@/models/session.model");
const session_repo_1 = require("@/repository/session.repo");
const course_service_1 = __importDefault(require("./course.service"));
const class_service_1 = __importDefault(require("./class.service"));
const sessionRepository = new session_repo_1.SessionRepository(session_model_1.Session);
const CreateSession = async (course_code, payload) => {
    const course = await course_service_1.default.GetCourseByCode(course_code);
    const course_id = course?._id;
    return sessionRepository.CreateSession(course_id, payload);
};
const GetAllSession = async (page, limit) => {
    return await sessionRepository.FindAllInfoAndPagination(page, limit, "course");
};
const GetSessionById = async (id) => {
    return await sessionRepository.FindById(id, ["course", "class"]);
};
const GetSessionByCode = async (code) => {
    return await sessionRepository.FindSessionByCode(code);
};
const GetSessionByClassCode = async (code) => {
    const result = await class_service_1.default.GetClassByCode(code);
    return await sessionRepository.FindSessionByClassId(result?._id);
};
const GetSessionByCourseCode = async (code) => {
    const result = await course_service_1.default.GetCourseByCode(code);
    return await sessionRepository.FindSessionByCourseId(result?._id);
};
const UpdateSessionById = async (id, payload) => {
    return await sessionRepository.FindByIdAndUpdate(id, payload);
};
const UpdateCourseByCondition = async (filter, payload) => {
    return await sessionRepository.UpdateMany(filter, payload);
};
const DeletedCourse = async (id) => {
    return await sessionRepository.DeleteOne(id);
};
exports.default = {
    CreateSession,
    GetAllSession,
    GetSessionById,
    GetSessionByCourseCode,
    UpdateSessionById,
    UpdateCourseByCondition,
    DeletedCourse,
    GetSessionByClassCode,
    GetSessionByCode,
};
//# sourceMappingURL=session.service.js.map