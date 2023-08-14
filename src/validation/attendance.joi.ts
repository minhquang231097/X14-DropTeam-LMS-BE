import Joi from "joi";
import { IAttendance } from "@/models/attendance.model";
import { UpdateAttendanceDto } from "@/types/attendance";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const AttendanceSchema = {
    Attendance: {
        create_attendance: Joi.object<IAttendance>({
            session: Joi.string().required(),
            class: Joi.string().required(),
            day: Joi.number().required(),
            absence: Joi.string().required(),
            class_size: Joi.number().required(),
        }),
        update_attendance: Joi.object<UpdateAttendanceDto>({
            session: Joi.string().required(),
            class: Joi.string().required(),
            day: Joi.number().required(),
            absence: Joi.string().required(),
            class_size: Joi.number().required(),
        }),
    }
}
