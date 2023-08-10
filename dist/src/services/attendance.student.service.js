"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_student_repo_1 = require("@/repository/attendance.student.repo");
const attendance_service_1 = __importDefault(require("./attendance.service"));
const user_service_1 = __importDefault(require("./user.service"));
const attendance_student_model_1 = require("@/models/attendance.student.model");
const class_service_1 = __importDefault(require("./class.service"));
const attendanceStudentRepository = new attendance_student_repo_1.AttendanceStudentRepository(attendance_student_model_1.Attendace_Student);
const AddStudentToAttendance = async (email, code, day) => {
    const [_student, _class] = await Promise.all([
        user_service_1.default.GetUserByEmail(email),
        class_service_1.default.GetClassByCode(code),
    ]);
    const _attendance = await attendance_service_1.default.GetAttendanceByClassAndDay(_class?._id, day);
    if (!_attendance) {
        return attendanceStudentRepository.Create({
            student: _student._id,
            attendance: _attendance._id,
        });
    }
};
const GetAllStudentInAttendance = async (id, page, limit) => {
    return await attendanceStudentRepository.FindByConditionAndPagination(page, limit, { attendance: id }, "student");
};
const GetAttendanceStudent = async (id, page, limit) => {
    return await attendanceStudentRepository.FindByConditionAndPagination(page, limit, { student: id }, "attendance");
};
const RemoveOne = async (id) => {
    return await attendanceStudentRepository.DeleteOne(id);
};
const RemoveMany = async (filter) => {
    return await attendanceStudentRepository.DeleteByCondition(filter);
};
exports.default = {
    AddStudentToAttendance,
    GetAllStudentInAttendance,
    GetAttendanceStudent,
    RemoveOne,
    RemoveMany,
};
//# sourceMappingURL=attendance.student.service.js.map