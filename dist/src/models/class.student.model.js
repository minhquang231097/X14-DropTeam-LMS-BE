"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class_Student = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const class_studentSchema = new mongoose_1.Schema({
    class: { type: mongoose_1.Schema.Types.ObjectId, ref: "classes" },
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "students" },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
class_studentSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Class_Student = (0, mongoose_1.model)("class_student", class_studentSchema);
//# sourceMappingURL=class.student.model.js.map