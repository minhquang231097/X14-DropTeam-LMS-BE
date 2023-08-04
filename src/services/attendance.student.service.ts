import { AttendanceStudentRepository } from "@/repository/attendance.student.repo";
import attendanceService from "./attendance.service";
import userService from "./user.service";
import { Attendace_Student } from "@/models/attendance.student.model";
import { IAttendance } from "@/models/attendance.model";

const attendanceStudentRepository = new AttendanceStudentRepository(
  Attendace_Student,
);
const AddStudentToAttendance = async (email: string, code: string) => {
  const _student: any = await userService.GetUserByEmail(email);
  const _attendance: any = await attendanceService.GetAttendanceByClassCode(
    code,
  );
  const exist = await attendanceStudentRepository.FindByCondition(
    { student: _student._id } || { attendance: _attendance._id },
  );
  if (!exist) {
    return attendanceStudentRepository.Create({
      student: _student._id,
      attendance: _attendance._id,
    });
  }
};

const GetAllStudentInAttendance = async (
  id: string,
  page: number,
  limit: number,
) => {
  return await attendanceStudentRepository.FindByConditionAndPagination(
    page,
    limit,
    { attendance: id },
    "student",
  );
};

const GetAttendanceStudent = async (
  id: string,
  page: number,
  limit: number,
) => {
  return await attendanceStudentRepository.FindByConditionAndPagination(
    page,
    limit,
    { student: id },
    "attendance",
  );
};

const RemoveOne = async (id: string) => {
  return await attendanceStudentRepository.DeleteOne(id);
};

const RemoveMany = async (filter: any) => {
  return await attendanceStudentRepository.DeleteByCondition(filter);
};

export default {
  AddStudentToAttendance,
  GetAllStudentInAttendance,
  GetAttendanceStudent,
  RemoveOne,
  RemoveMany,
};
