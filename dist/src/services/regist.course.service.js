"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_service_1 = __importDefault(require("./course.service"));
const workplace_service_1 = __importDefault(require("./workplace.service"));
const user_service_1 = __importDefault(require("./user.service"));
const registe_course_model_1 = require("@/models/registe.course.model");
const regist_course_repo_1 = require("@/repository/regist.course.repo");
const registCourseRepository = new regist_course_repo_1.RegistedCourseRepository(registe_course_model_1.RegistedCourse);
const CreateRegistCourse = async (course_code, student_id, note) => {
    const [_course, _student] = await Promise.all([
        course_service_1.default.GetCourseByCode(course_code),
        user_service_1.default.GetUserById(student_id),
    ]);
    return await registCourseRepository.Create({
        fullname: _student.fullname,
        email: _student.email,
        phone_number: _student.phone_number,
        course: _course?._id,
        workplace: _course?.workplace,
        note: note,
        student: _student._id,
    });
};
const GetAllRegist = async (page, limit) => {
    return await registCourseRepository.FindAllInfoAndPagination(page, limit);
};
const GetRegistByCourseCode = async (code, page, limit) => {
    const _course = await course_service_1.default.GetCourseByCode(code);
    return await registCourseRepository.FindRegistbyCourseId(_course?._id, page, limit);
};
const GetRegistByWorkplaceCode = async (code, page, limit) => {
    const _workplace = await workplace_service_1.default.GetWorkplaceByCode(code);
    return await registCourseRepository.FindRegistbyWorkplaceId(_workplace?._id, page, limit);
};
const GetRegistByEmailStudent = async (email) => {
    const _student = await user_service_1.default.GetUserByEmail(email);
    return await registCourseRepository.FindRegistbyStudentId(_student?._id);
};
const GetRegistById = async (id) => {
    return await registCourseRepository.FindById(id);
};
const UpdateRegist = async (id, payload) => {
    return await registCourseRepository.FindByIdAndUpdate(id, payload);
};
const DeleteRegist = async (id) => {
    return await registCourseRepository.DeleteOne(id);
};
exports.default = {
    DeleteRegist,
    UpdateRegist,
    CreateRegistCourse,
    GetRegistByCourseCode,
    GetRegistByWorkplaceCode,
    GetRegistByEmailStudent,
    GetAllRegist,
    GetRegistById,
};
//# sourceMappingURL=regist.course.service.js.map