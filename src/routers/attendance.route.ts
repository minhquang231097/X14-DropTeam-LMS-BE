import attendanceController from "@/controllers/attendance.controller";
import express from "express";

const attendanceRouter = express.Router();

attendanceRouter.post("/", attendanceController.CreateNewAttendance);
attendanceRouter.put("/", attendanceController.UpdateAttendance);
attendanceRouter.get("/", attendanceController.GetAttendance);
attendanceRouter.delete("/", attendanceController.DeleteAttendance);

export default attendanceRouter;
