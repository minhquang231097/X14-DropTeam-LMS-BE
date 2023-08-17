import { Attendance } from "@/models/attendance.model";
import { AttendanceRepository } from "@/repository/attendance.repo";
import sessionService from "./session.service";
import classService from "./class.service";
import { FindAttendanceDto, UpdateAttendanceDto } from "@/types/attendance";

const attendanceRepository = new AttendanceRepository(Attendance);

const CreateAttendance = async (session_code: string, class_code: string, payload: any) => {
  const [_session, _class] = await Promise.all([
    sessionService.GetSessionByCode(session_code),
    classService.GetClassByCode(class_code),
  ]);
  const newAttendance = await attendanceRepository.Create({
    session: _session?._id,
    class: _class?.id,
    day: payload.day,
    class_size: payload.class_size,
    absence: payload.absence,
  });
  return newAttendance;
};

const GetAttendanceByDay = async (day: number, page: number, limit: number) => {
  return await attendanceRepository.FindByConditionAndPagination(page, limit, { day }, ["session", "class"]);
};

const GetAttendanceByClassCodeAndDay = async (class_code: string, day: number) => {
  const _class = await classService.GetClassByCode(class_code);
  return await attendanceRepository.FindByCondition({
    class: _class?._id,
    day: day,
  });
};

const GetAttendanceByClassCode = async (code: string, page: number, limit: number) => {
  const foundAttendance: any = await classService.GetClassByCode(code);
  return await attendanceRepository.FindAttendanceByClassId(foundAttendance._id, page, limit);
};

const GetAttendance = async (page: number, limit: number) => {
  return await attendanceRepository.FindAllInfoAndPagination(page, limit, ["session", "class"]);
};

const UpdateAttendance = async (id: string, payload: UpdateAttendanceDto) => {
  return await attendanceRepository.FindByIdAndUpdate(id, payload);
};

const DeleteAttendanceById = async (id: string) => {
  return await attendanceRepository.DeleteOne(id);
};

const DeleteAttendanceByCondition = async (filter: FindAttendanceDto) => {
  return await attendanceRepository.DeleteByCondition(filter);
};

export default {
  CreateAttendance,
  UpdateAttendance,
  DeleteAttendanceByCondition,
  DeleteAttendanceById,
  GetAttendanceByClassCode,
  GetAttendanceByClassCodeAndDay,
  GetAttendanceByDay,
  GetAttendance,
};
