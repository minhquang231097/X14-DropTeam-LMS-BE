import { User } from "@/models/user.model";
import { UserRepository } from "@/repository/user.repo";
import bcrypt from "bcryptjs";
import attendanceStudentService from "./attendance.student.service";

const userRepository = new UserRepository(User);

const CreateUser = async (payload: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(payload.password, salt);
  const user = await userRepository.Create({
    ...payload,
    password: hashedPassword,
  });
  return user;
};

const GetAllUser = async (page: number, limit: number, sortBy?: any) => {
  return await userRepository.FindAllUser(page, limit, sortBy);
};

const GetUserByUsername = async (username: string) => {
  return await userRepository.FindByCondition({ username });
};

const GetUserByEmail = async (email: string) => {
  return await userRepository.FindByCondition({ email });
};

const GetUserById = async (id: string) => {
  return await userRepository.FindById(id);
};

const GetUserByCondition = async (filter: any) => {
  return await userRepository.FindByCondition(filter);
};

const GetUserByAttendance = async (attendance_id: string, page?: any, limit?: any, sortBy?: any) => {
  return await attendanceStudentService.GetAllStudentInAttendance(attendance_id, page, limit, sortBy);
};

const SearchUserByCondition = async (searchTerm?: string, page?: any, limit?: any, sortBy?: any) => {
  return await userRepository.SearchUser(searchTerm, page, limit, sortBy);
};

const SearchUserByConditionAndRole = async (
  searchTerm?: string,
  role?: string,
  page?: number,
  limit?: number,
  sortBy?: any,
) => {
  return await userRepository.SearchUserByConditionAndRole(searchTerm, role, page, limit, sortBy);
};

const UpdateUserById = async (id: string, payload: any) => {
  return await userRepository.FindByIdAndUpdate(id, payload);
};

const UpdateUserByCondition = async (filter: any, payload: any) => {
  return await userRepository.UpdateMany(filter, payload);
};

const DeleteUserById = async (id: string) => {
  return await userRepository.DeleteOne(id);
};

const DeleteUserByCondition = async (filter: any) => {
  return await userRepository.DeleteByCondition(filter);
};

const GetTotalUser = async () => {
  return await userRepository.Count();
};

const GetUserByRole = async (role: string, page?: number, limit?: number, sortBy?: Object) => {
  return await userRepository.FindAllUserByRole(role, page, limit, sortBy);
};

const SortUser = async () => {
  return await userRepository.Sort();
};

export default {
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
  GetTotalUser,
  GetUserByRole,
  SortUser,
  SearchUserByConditionAndRole,
};
