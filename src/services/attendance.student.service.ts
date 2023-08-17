import { AttendanceStudentRepository } from "@/repository/attendance.student.repo";
import attendanceService from "./attendance.service";
import userService from "./user.service";
import { Attendace_Student } from "@/models/attendance.student.model";
import classService from "./class.service";
import { FindUserDto } from "@/types/user";

const attendanceStudentRepository = new AttendanceStudentRepository(Attendace_Student);

// const AddStudentToAttendance = async (email: string, class_code: string, day: number) => {
//   const _student = await userService.GetUserByEmail(email);
//   const _attendance: any = await attendanceService.GetAttendanceByClassCodeAndDay(class_code, day);
//   if (!_attendance) {
//     return attendanceStudentRepository.Create({
//       student: _student._id,
//       attendance: _attendance._id,
//     });
//   }
// };

const GetAllStudentInAttendance = async (id: string, page: number, limit: number) => {
  return await attendanceStudentRepository.FindByConditionAndPagination(page, limit, { attendance: id }, "student");
};

const GetAllAttendance = async (page: number, limit: number) => {
  return await attendanceStudentRepository.FindAllInfoAndPagination(page, limit, [
    "student",
    { path: "attendance", populate: { path: "session" } },
  ]);
};

const GetAttendanceByStudentId = async (id: string, page: number, limit: number) => {
  return await attendanceStudentRepository.FindByConditionAndPagination(page, limit, { student: id }, "attendance");
};

const GetAttendanceByEmailStudent = async (email: string, page: number, limit: number) => {
  const student: FindUserDto = await userService.GetUserByEmail(email);
  return await attendanceStudentRepository.FindByConditionAndPagination(
    page,
    limit,
    { student: student._id },
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
  // AddStudentToAttendance,
  GetAllStudentInAttendance,
  GetAttendanceByStudentId,
  GetAttendanceByEmailStudent,
  GetAllAttendance,
  RemoveOne,
  RemoveMany,
};
