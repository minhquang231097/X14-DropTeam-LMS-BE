"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_controller_1 = __importDefault(require("@/controllers/attendance.controller"));
const express_1 = __importDefault(require("express"));
const attendanceRouter = express_1.default.Router();
attendanceRouter.post("/", attendance_controller_1.default.CreateNewAttendance);
attendanceRouter.put("/", attendance_controller_1.default.UpdateAttendance);
attendanceRouter.get("/", attendance_controller_1.default.GetAttendance);
attendanceRouter.delete("/", attendance_controller_1.default.DeleteAttendance);
exports.default = attendanceRouter;
//# sourceMappingURL=attendance.route.js.map