"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workplace = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const workplaceSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    address: String,
    status: { type: String, enum: ["ON", "OFF", "UPCOMING"] },
    workplace_code: { type: String, unique: true },
    create_at: {
        type: Date,
        default: Date.now(),
    },
    formated_date: String,
});
var StatusWP;
(function (StatusWP) {
    StatusWP[StatusWP["ON"] = 0] = "ON";
    StatusWP[StatusWP["OFF"] = 1] = "OFF";
    StatusWP[StatusWP["UPCOMING"] = 2] = "UPCOMING";
})(StatusWP || (StatusWP = {}));
workplaceSchema.pre("save", function (next) {
    this.formated_date = (0, moment_1.default)(this.create_at).format("DD/MM/YYYY");
    next();
});
exports.Workplace = (0, mongoose_1.model)("workplaces", workplaceSchema);
//# sourceMappingURL=workplace.model.js.map