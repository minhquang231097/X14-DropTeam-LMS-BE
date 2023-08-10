"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const attendanceSchema = new mongoose_1.Schema({
    session: { type: mongoose_1.Schema.Types.ObjectId, ref: "sessions" },
    class: { type: mongoose_1.Schema.Types.ObjectId, ref: "classes" },
    day: Number,
    class_size: Number,
    absence: String,
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
attendanceSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Attendance = (0, mongoose_1.model)("attendances", attendanceSchema);
//# sourceMappingURL=attendance.model.js.map