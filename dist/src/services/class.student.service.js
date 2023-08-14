"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_student_repo_1 = require("@/repository/class.student.repo");
const class_service_1 = __importDefault(require("./class.service"));
const class_student_model_1 = require("@/models/class.student.model");
const user_service_1 = __importDefault(require("./user.service"));
const classStudentRepository = new class_student_repo_1.ClassStudentRepository(class_student_model_1.Class_Student);
const AddStudentToClass = async (email, class_code) => {
    const [_student, _class] = await Promise.all([
        user_service_1.default.GetUserByEmail(email),
        class_service_1.default.GetClassByCode(class_code),
    ]);
    const exist = await classStudentRepository.FindByCondition({ student: _student?._id } || { class: _class?._id });
    if (!exist) {
        return await classStudentRepository.Create({
            class: _class?._id,
            student: _student?._id,
        });
    }
};
const GetAllStudentInClass = async (page, limit, class_code) => {
    return await classStudentRepository.FindByConditionAndPagination(page, limit, { class: class_code }, "student");
};
const GetClassByStudentEmail = async (page, limit, email) => {
    const student = await user_service_1.default.GetUserByEmail(email);
    return await classStudentRepository.FindByConditionAndPagination(page, limit, { student: student?._id }, "student");
};
const RemoveStudentOutOfClass = async (id) => {
    return await classStudentRepository.DeleteOne(id);
};
exports.default = {
    AddStudentToClass,
    RemoveStudentOutOfClass,
    GetAllStudentInClass,
    GetClassByStudentEmail,
};
//# sourceMappingURL=class.student.service.js.map