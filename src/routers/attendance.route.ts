import attendanceController from "@/controllers/attendance.controller";
import express from "express";
import { AttendanceSchema } from "@/validation/attendance.joi";
import { ValidateJoi } from "@/validation/validatejoi";

const attendanceRouter = express.Router();

attendanceRouter.get("/", attendanceController.GetAttendance);
attendanceRouter.get("/:id", attendanceController.GetInfoAttendanceStudent);
attendanceRouter.post("/", ValidateJoi(AttendanceSchema.Attendance.create_list_attendance), attendanceController.CreateListAttendance);
attendanceRouter.put("/:id", attendanceController.UpdateAttendance);
attendanceRouter.delete("/:id", attendanceController.DeleteAttendance);

export default attendanceRouter;
