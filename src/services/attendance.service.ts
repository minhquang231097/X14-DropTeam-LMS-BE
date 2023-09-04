import { Attendance } from "@/models/attendance.model";
import { AttendanceRepository } from "@/repository/attendance.repo";
import { FindAttendanceDto, UpdateAttendanceDto } from "@/types/attendance";

const attendanceRepository = new AttendanceRepository(Attendance);

const CreateAttendance = async (session_id: string, class_id: string) => {
  const newAttendance = await attendanceRepository.Create({
    session: session_id,
    class: class_id,
  });
  return newAttendance;
};

const GetAttendanceById = async (id: string) => {
  return await attendanceRepository.FindById(id, ["session", "class"]);
};

const GetAttendanceByClassId = async (class_id: string, page?: number, limit?: number, sortBy?: any) => {
  return await attendanceRepository.FindAttendanceByClassId(class_id, page, limit, sortBy);
};

const GetAttendanceBySessionId = async (session_id: string, page?: number, limit?: number, sortBy?: any) => {
  return await attendanceRepository.FindAttendanceBySessionId(session_id, page, limit);
};

const GetAllAttendance = async (page?: number, limit?: number, sortBy?: any) => {
  return await attendanceRepository.FindAllInfoAndPagination(page, limit, sortBy, ["session", "class"]);
};

const CountAttendance = async () => {
  return await attendanceRepository.Count();
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
  GetAttendanceByClassId,
  GetAttendanceBySessionId,
  GetAllAttendance,
  CountAttendance,
  GetAttendanceById,
};
