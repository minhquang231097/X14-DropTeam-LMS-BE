"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const response_config_1 = require("@/configs/response.config");
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    course_code: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.COURSE.CODE_EXIST] },
    title: String,
    image: [String],
    desc: String,
    session_per_course: Number,
    price: Number,
    level: { type: String, enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"] },
    rate: Number,
    discount: { type: Number, default: 0 },
    workplace: { type: mongoose_1.Schema.Types.ObjectId, ref: "workplaces" },
    create_at: {
        type: Date,
        default: Date.now(),
    },
});
exports.Course = (0, mongoose_1.model)("courses", courseSchema);
//# sourceMappingURL=course.model.js.map