import { Attendance } from "@/models/attendance.model";
import { AttendanceRepository } from "@/repository/attendance.repo";
import sessionService from "./session.service";
import classService from "./class.service";
import { ObjectId } from "mongoose";
import { FindAttendanceDto, UpdateAttendanceDto } from "@/types/attendance";

const attendanceRepository = new AttendanceRepository(Attendance)

const CreateAttendance = async (session_code: string, class_code: string, payload: any) => {
    const _session = await sessionService.GetSessionByCode(session_code)
    const _class = await classService.GetClassByCode(class_code)
    const newAttendance = await attendanceRepository.Create({ ...payload, session: _session?._id, class: _class?.id })
    return newAttendance
}

const GetAttendanceById = async (id: ObjectId | string) => {
    return await attendanceRepository.FindById(id, ["session", "class"])
}

const GetAttendanceBySessionCode = async (code: string) => {
    const foundAttendance: any = await sessionService.GetSessionByCode(code)
    return await attendanceRepository.FindAttendanceBySessionId(foundAttendance._id)
}

const GetAttendanceByClassCode = async (code: string) => {
    const foundAttendance: any = await classService.GetClassByCode(code)
    return await attendanceRepository.FindAttendanceByClassId(foundAttendance._id)
}

const GetAttendanceByCondition = async (filter: FindAttendanceDto) => {
    return await attendanceRepository.FindByCondition(filter, ["session", "class"])
}

const UpdateAttendance = async (id: ObjectId | string, payload: UpdateAttendanceDto) => {
    return await attendanceRepository.FindByIdAndUpdate(id, payload)
}

const DeleteAttendanceById = async (id: ObjectId | string) => {
    return await attendanceRepository.DeleteOne(id)
}

const DeleteAttendanceByCondition = async (filter: FindAttendanceDto) => {
    return await attendanceRepository.DeleteByCondition(filter)
}

export default { CreateAttendance, UpdateAttendance, DeleteAttendanceByCondition, DeleteAttendanceById, GetAttendanceByCondition, GetAttendanceById, GetAttendanceBySessionCode, GetAttendanceByClassCode }