"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workplace_Admin = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const worplace_adminSchema = new mongoose_1.Schema({
    workplace: { type: mongoose_1.Schema.Types.ObjectId, ref: "workplaces" },
    admin: { type: mongoose_1.Schema.Types.ObjectId, ref: "admins" },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
worplace_adminSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Workplace_Admin = (0, mongoose_1.model)("workplace_admin", worplace_adminSchema);
//# sourceMappingURL=workplace_admin.model.js.map