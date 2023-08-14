"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const response_config_1 = require("@/configs/response.config");
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    course_code: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.CODE_EXIST] },
    title: String,
    image: [String],
    desc: String,
    session_per_course: Number,
    price: Number,
    duration: Number,
    level: Number,
    rate: Number,
    discount: Number,
    workplace: { type: mongoose_1.Schema.Types.ObjectId, ref: "workplaces" },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
courseSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Course = (0, mongoose_1.model)("courses", courseSchema);
//# sourceMappingURL=course.model.js.map