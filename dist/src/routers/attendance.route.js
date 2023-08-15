"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_controller_1 = __importDefault(require("@/controllers/attendance.controller"));
const attendance_joi_1 = require("@/validation/attendance.joi");
const validatejoi_1 = require("@/validation/validatejoi");
const express_1 = __importDefault(require("express"));
const attendanceRouter = express_1.default.Router();
attendanceRouter.post("/", (0, validatejoi_1.ValidateJoi)(attendance_joi_1.AttendanceSchema.Attendance.create_attendance), attendance_controller_1.default.CreateNewAttendance);
attendanceRouter.put("/:id", (0, validatejoi_1.ValidateJoi)(attendance_joi_1.AttendanceSchema.Attendance.update_attendance), attendance_controller_1.default.UpdateAttendance);
attendanceRouter.get("/", attendance_controller_1.default.GetAttendance);
attendanceRouter.delete("/:id", attendance_controller_1.default.DeleteAttendance);
exports.default = attendanceRouter;
//# sourceMappingURL=attendance.route.js.map