"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const response_config_1 = require("@/configs/response.config");
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "courses" },
    class: { type: mongoose_1.Schema.Types.ObjectId, ref: "classes" },
    session_code: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.CODE_EXIST] },
    session_name: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.SESSION.NAME_EXIST] },
    desc: String,
    status: { type: String, enum: ["COMPLETED", "UNCOMPLETED"] },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
var StatusSS;
(function (StatusSS) {
    StatusSS[StatusSS["COMPLETED"] = 0] = "COMPLETED";
    StatusSS[StatusSS["UNCOMPLETED"] = 1] = "UNCOMPLETED";
})(StatusSS || (StatusSS = {}));
sessionSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Session = (0, mongoose_1.model)("sessions", sessionSchema);
//# sourceMappingURL=session.model.js.map