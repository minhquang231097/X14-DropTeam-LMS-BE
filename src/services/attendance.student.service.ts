import { AttendanceStudentRepository } from "@/repository/attendance.student.repo";
import attendanceService from "./attendance.service";
import userService from "./user.service";
import { Attendace_Student } from "@/models/attendance.student.model";
import classService from "./class.service";

const attendanceStudentRepository = new AttendanceStudentRepository(
  Attendace_Student,
);
const AddStudentToAttendance = async (
  email: string,
  code: string,
  day: number,
) => {
  const [_student, _class] = await Promise.all([
    userService.GetUserByEmail(email),
    classService.GetClassByCode(code),
  ]);
  const _attendance: any = await attendanceService.GetAttendanceByClassAndDay(
    _class?._id,
    day,
  );
  if (!_attendance) {
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
