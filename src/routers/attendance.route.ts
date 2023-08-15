import attendanceController from "@/controllers/attendance.controller";
import express from "express";

const attendanceRouter = express.Router();

attendanceRouter.post("/", attendanceController.CreateNewAttendance);
attendanceRouter.put("/:id", attendanceController.UpdateAttendance);
attendanceRouter.get("/", attendanceController.GetAttendance);
attendanceRouter.delete("/:id", attendanceController.DeleteAttendance);

export default attendanceRouter;
