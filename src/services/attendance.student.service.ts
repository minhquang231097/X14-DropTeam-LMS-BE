import { AttendanceStudentRepository } from "@/repository/attendance.student.repo";
import { Attendace_Student } from "@/models/attendance.student.model";
import { CreateAttendanceStudentDto } from "@/types/attendance";
import attendanceService from "./attendance.service";
import userService from "./user.service";

const attendanceStudentRepository = new AttendanceStudentRepository(Attendace_Student);

const CreateListAttendance = async (list: CreateAttendanceStudentDto[]) => {
  return await Promise.all(
    list.map((el) => {
      attendanceStudentRepository.Create({
        student: el.student_id,
        attendance: el.attendance_id,
        score: el.score,
        comment: el.comment,
        status: el.status,
      });
    }),
  );
};

const GetAllStudentInAttendance = async (id: string, page?: any, limit?: any) => {
  const exist = await attendanceService.GetAttendanceById(id);
  if (!exist) {
    return [];
  }
  return await attendanceStudentRepository.FindByConditionAndPagination({ attendance: id }, page, limit, "student");
};

const GetAllAttendance = async (page: number, limit: number) => {
  return await attendanceStudentRepository.FindAllInfoAndPagination(page, limit, ["student", { path: "attendance", populate: { path: "session" } }]);
};

const GetAttendanceByStudentId = async (id: string, page?: any, limit?: any) => {
  const exist = await userService.GetUserById(id);
  if (!exist) {
    return [];
  }
  return await attendanceStudentRepository.FindByConditionAndPagination({ student: id }, page, limit, "attendance");
};

const RemoveOne = async (id: string) => {
  return await attendanceStudentRepository.DeleteOne(id);
};

const RemoveMany = async (filter: any) => {
  return await attendanceStudentRepository.DeleteByCondition(filter);
};

export default {
  CreateListAttendance,
  GetAllStudentInAttendance,
  GetAttendanceByStudentId,
  GetAllAttendance,
  RemoveOne,
  RemoveMany,
};
