"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const response_config_1 = require("@/configs/response.config");
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    mentor: { type: mongoose_1.Schema.Types.ObjectId, ref: "mentors" },
    workplace: { type: mongoose_1.Schema.Types.ObjectId, ref: "workplaces" },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "courses" },
    class_code: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.CODE_EXIST] },
    session_per_class: Number,
    start_at: String,
    end_at: String,
    total_hours: Number,
    total_session: Number,
    session_per_week: Number,
    hour_per_session: Number,
    schedule: [Number],
    class_size: Number,
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
classSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Class = (0, mongoose_1.model)("classes", classSchema);
//# sourceMappingURL=class.model.js.map