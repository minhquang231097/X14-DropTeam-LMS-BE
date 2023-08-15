"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = require("@/models/course.model");
const course_repo_1 = require("@/repository/course.repo");
const workplace_service_1 = __importDefault(require("./workplace.service"));
const courseRepository = new course_repo_1.CourseRepository(course_model_1.Course);
const CreateCourse = async (workplace_code, payload) => {
    const _workplace = await workplace_service_1.default.GetWorkplaceByCode(workplace_code);
    return await courseRepository.Create({
        ...payload,
        workplace: _workplace?._id,
    });
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
const GetTotalCourse = async () => {
    return (await courseRepository.FindAll()).length;
};
const SearchCourseByCondition = async (page, limit, searchTerm) => {
    const query = {
        $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { course_code: { $regex: searchTerm, $options: "i" } },
        ],
    };
    return await courseRepository.SearchByCondition(page, limit, query);
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
    SearchCourseByCondition,
    UpdateCourse,
    DeletedCourse,
    GetCourseByCode,
    UpdateManyCourse,
    GetTotalCourse,
};
//# sourceMappingURL=course.service.js.map