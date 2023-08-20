import attendanceController from "@/controllers/attendance.controller";
import express from "express";

const attendanceRouter = express.Router();

attendanceRouter.get("/", attendanceController.GetAttendance);
attendanceRouter.get("/:id", attendanceController.GetInfoAttendanceStudent);
// attendanceRouter.post("/", ValidateJoi(AttendanceSchema.Attendance.create_attendance), attendanceController.CreateAttendance);
attendanceRouter.put("/:id", attendanceController.UpdateAttendance);
attendanceRouter.delete("/:id", attendanceController.DeleteAttendance);

export default attendanceRouter;
