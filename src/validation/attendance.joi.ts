import Joi from "joi";
import { CreateAttendanceDto, UpdateAttendanceDto } from "@/types/attendance";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const AttendanceSchema = {
  Attendance: {
    create_attendance: Joi.object<CreateAttendanceDto>({
      session_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_SESSION} (import session_id)`,
          "any.required": `{{#label}} is a required field `,
        }),
      class_id: Joi.string()
        .required()
        .messages({
          "string.empty": `${RESPONSE_CONFIG.MESSAGE.ATTENDANCE.NO_CLASS} (import class_code)`,
          "any.required": `{{#label}} is a required field `,
        }),
    }),
  },
};
