"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workplace = void 0;
const response_config_1 = require("@/configs/response.config");
const mongoose_1 = require("mongoose");
const workplaceSchema = new mongoose_1.Schema({
    name: { type: String, unique: [true, response_config_1.RESPONSE_CONFIG.MESSAGE.WORKPLACE.WORKPLACE_EXIST] },
    address: String,
    status: { type: String, enum: ["ON", "OFF", "UPCOMING"] },
    workplace_code: { type: String, unique: [true, "Workplace code exist"] },
    create_at: { type: Date, default: Date.now() },
});
var StatusWP;
(function (StatusWP) {
    StatusWP[StatusWP["ON"] = 0] = "ON";
    StatusWP[StatusWP["OFF"] = 1] = "OFF";
    StatusWP[StatusWP["UPCOMING"] = 2] = "UPCOMING";
})(StatusWP || (StatusWP = {}));
exports.Workplace = (0, mongoose_1.model)("workplaces", workplaceSchema);
//# sourceMappingURL=workplace.model.js.map