import { Attendance } from "@/models/attendance.model";
import { AttendanceRepository } from "@/repository/attendance.repo";
import sessionService from "./session.service";
import classService from "./class.service";
import { FindAttendanceDto, UpdateAttendanceDto } from "@/types/attendance";

const attendanceRepository = new AttendanceRepository(Attendance);

const CreateAttendance = async (
  session_code: string,
  class_code: string,
  payload: any,
) => {
  const [_session, _class] = await Promise.all([
    sessionService.GetSessionByCode(session_code),
    classService.GetClassByCode(class_code),
  ]);
  const newAttendance = await attendanceRepository.Create({
    ...payload,
    session: _session?._id,
    class: _class?.id,
  });
  return newAttendance;
};

const GetAttendanceById = async (id: string) => {
  return await attendanceRepository.FindById(id, ["session", "class"]);
};

const GetAttendanceByClassAndDay = async (class_id: string, day: number) => {
  return await attendanceRepository.FindByCondition({
    class: class_id,
    day: day,
  });
};

const GetAttendanceByClassCode = async (
  code: string,
  page: number,
  limit: number,
) => {
  const foundAttendance: any = await classService.GetClassByCode(code);
  return await attendanceRepository.FindAttendanceByClassId(
    foundAttendance._id,
    page,
    limit,
  );
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
  GetAttendanceById,
  GetAttendanceByClassCode,
  GetAttendanceByClassAndDay,
};
