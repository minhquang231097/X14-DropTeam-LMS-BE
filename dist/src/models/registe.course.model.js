"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistedCourse = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const registe_CourseSchema = new mongoose_1.Schema({
    fullname: String,
    email: String,
    phone_number: Number,
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "courses" },
    workplace: { type: mongoose_1.Schema.Types.ObjectId, ref: "workplaces" },
    note: String,
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "students" },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
registe_CourseSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.RegistedCourse = (0, mongoose_1.model)("registed_course", registe_CourseSchema);
//# sourceMappingURL=registe.course.model.js.map