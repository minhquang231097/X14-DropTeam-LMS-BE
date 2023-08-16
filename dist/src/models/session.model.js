"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const response_config_1 = require("@/configs/response.config");
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "courses", required: true },
    class: { type: mongoose_1.Schema.Types.ObjectId, ref: "classes" },
    session_code: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.CODE_EXIST] },
    session_name: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NAME_EXIST] },
    desc: String,
    status: { type: String, enum: ["COMPLETED", "UNCOMPLETED"] },
    create_at: {
        type: Date,
        default: Date.now(),
    },
});
var StatusSS;
(function (StatusSS) {
    StatusSS[StatusSS["COMPLETED"] = 0] = "COMPLETED";
    StatusSS[StatusSS["UNCOMPLETED"] = 1] = "UNCOMPLETED";
})(StatusSS || (StatusSS = {}));
exports.Session = (0, mongoose_1.model)("sessions", sessionSchema);
//# sourceMappingURL=session.model.js.map