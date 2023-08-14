"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendace_Student = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const attendance_studentSchema = new mongoose_1.Schema({
    attendance: { type: mongoose_1.Schema.Types.ObjectId, ref: "attendances" },
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "students" },
    score: String,
    comment: String,
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
attendance_studentSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Attendace_Student = (0, mongoose_1.model)("attendance_student", attendance_studentSchema);
//# sourceMappingURL=attendance.student.model.js.map