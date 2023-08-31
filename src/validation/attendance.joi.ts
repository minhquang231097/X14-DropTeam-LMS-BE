import Joi from "joi";
import { CreateAttendanceDto, UpdateAttendanceDto } from "@/types/attendance";
import { RESPONSE_CONFIG } from "@/configs/response.config";

export const AttendanceSchema = {
  Attendance: {
    create_list_attendance: Joi.object({
      list: Joi.array().items(
        Joi.object<CreateAttendanceDto>({
          session_id: Joi.string().required().messages({
            "string.empty": "student_id is required",
            "any.required": "student_id is a required field",
          }),
          class_id: Joi.string().required().messages({
            "string.empty": "class_id is required",
            "any.required": "class_id is a required field",
          }),
        }),
      ),
    }),
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
