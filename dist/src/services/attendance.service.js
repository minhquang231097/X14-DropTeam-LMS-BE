"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_model_1 = require("@/models/attendance.model");
const attendance_repo_1 = require("@/repository/attendance.repo");
const session_service_1 = __importDefault(require("./session.service"));
const class_service_1 = __importDefault(require("./class.service"));
const attendanceRepository = new attendance_repo_1.AttendanceRepository(attendance_model_1.Attendance);
const CreateAttendance = async (session_code, class_code, payload) => {
    const [_session, _class] = await Promise.all([
        session_service_1.default.GetSessionByCode(session_code),
        class_service_1.default.GetClassByCode(class_code),
    ]);
    const newAttendance = await attendanceRepository.Create({
        ...payload,
        session: _session?._id,
        class: _class?.id,
    });
    return newAttendance;
};
const GetAttendanceById = async (id) => {
    return await attendanceRepository.FindById(id, ["session", "class"]);
};
const GetAttendanceByClassAndDay = async (class_id, day) => {
    return await attendanceRepository.FindByCondition({
        class: class_id,
        day: day,
    });
};
const GetAttendanceByClassCode = async (code, page, limit) => {
    const foundAttendance = await class_service_1.default.GetClassByCode(code);
    return await attendanceRepository.FindAttendanceByClassId(foundAttendance._id, page, limit);
};
const UpdateAttendance = async (id, payload) => {
    return await attendanceRepository.FindByIdAndUpdate(id, payload);
};
const DeleteAttendanceById = async (id) => {
    return await attendanceRepository.DeleteOne(id);
};
const DeleteAttendanceByCondition = async (filter) => {
    return await attendanceRepository.DeleteByCondition(filter);
};
exports.default = {
    CreateAttendance,
    UpdateAttendance,
    DeleteAttendanceByCondition,
    DeleteAttendanceById,
    GetAttendanceById,
    GetAttendanceByClassCode,
    GetAttendanceByClassAndDay,
};
//# sourceMappingURL=attendance.service.js.map