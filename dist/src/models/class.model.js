"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const response_config_1 = require("@/configs/response.config");
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    mentor: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    workplace: { type: mongoose_1.Schema.Types.ObjectId, ref: "workplaces" },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "courses" },
    class_code: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.CLASS.CODE_EXIST] },
    start_at: Date,
    end_at: Date,
    total_hours: Number,
    total_session: Number,
    hour_per_session: Number,
    schedule: [Date],
    class_size: Number,
    create_at: {
        type: Date,
        default: Date.now(),
    },
});
exports.Class = (0, mongoose_1.model)("classes", classSchema);
//# sourceMappingURL=class.model.js.map