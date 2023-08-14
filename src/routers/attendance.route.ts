import attendanceController from "@/controllers/attendance.controller";
import { AttendanceSchema } from "@/validation/attendance.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const attendanceRouter = express.Router();

attendanceRouter.post("/", ValidateJoi(AttendanceSchema.Attendance.create_attendance), attendanceController.CreateNewAttendance);
attendanceRouter.put("/", ValidateJoi(AttendanceSchema.Attendance.update_attendance), attendanceController.UpdateAttendance);
attendanceRouter.get("/", attendanceController.GetAttendance);
attendanceRouter.delete("/", attendanceController.DeleteAttendance);

export default attendanceRouter;
