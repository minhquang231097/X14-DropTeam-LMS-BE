"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("@/models/user.model");
const user_repo_1 = require("@/repository/user.repo");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const attendance_student_service_1 = __importDefault(require("./attendance.student.service"));
const userRepository = new user_repo_1.UserRepository(user_model_1.User);
const CreateUser = async (payload) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(payload.password, salt);
    const user = await userRepository.Create({
        ...payload,
        password: hashedPassword,
    });
    return user;
};
const GetAllUser = async (page, limit) => {
    return await userRepository.FindAllInfoAndPagination(page, limit);
};
const GetUserByUsername = async (username) => {
    return await userRepository.FindByCondition({ username });
};
const GetUserByEmail = async (email) => {
    return await userRepository.FindByCondition({ email });
};
const GetUserById = async (id) => {
    return await userRepository.FindById(id);
};
const GetUserByCondition = async (filter) => {
    return await userRepository.FindByCondition(filter);
};
const GetUserByAttendance = async (attendanceId, page, limit) => {
    return await attendance_student_service_1.default.GetAllStudentInAttendance(attendanceId, page, limit);
};
const SearchUserByCondition = async (page, limit, filter, field) => {
    return await userRepository.Search(page, limit, null, filter, field);
};
const UpdateUserById = async (id, payload) => {
    return await userRepository.FindByIdAndUpdate(id, payload);
};
const UpdateUserByCondition = async (filter, payload) => {
    return await userRepository.UpdateMany(filter, payload);
};
const DeleteUserById = async (id) => {
    return await userRepository.DeleteOne(id);
};
const DeleteUserByCondition = async (filter) => {
    return await userRepository.DeleteByCondition(filter);
};
exports.default = {
    CreateUser,
    SearchUserByCondition,
    GetAllUser,
    GetUserByUsername,
    UpdateUserById,
    GetUserByEmail,
    GetUserById,
    DeleteUserById,
    DeleteUserByCondition,
    UpdateUserByCondition,
    GetUserByCondition,
    GetUserByAttendance,
};
//# sourceMappingURL=user.service.js.map