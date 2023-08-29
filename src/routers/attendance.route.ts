import attendanceController from "@/controllers/attendance.controller";
import express from "express";

const attendanceRouter = express.Router();

attendanceRouter.get("/", attendanceController.GetAttendance);
attendanceRouter.get("/:id", attendanceController.GetInfoAttendanceStudent);
attendanceRouter.post("/", attendanceController.CreateListAttendance);
attendanceRouter.put("/:id", attendanceController.UpdateAttendance);
attendanceRouter.delete("/:id", attendanceController.DeleteAttendance);

export default attendanceRouter;
