"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_controller_1 = __importDefault(require("@/controllers/session.controller"));
const express_1 = __importDefault(require("express"));
const sessionRouter = express_1.default.Router();
sessionRouter.get("/", session_controller_1.default.GetSession);
sessionRouter.post("/", session_controller_1.default.CreateNewSession);
sessionRouter.put("/", session_controller_1.default.UpdateSession);
sessionRouter.delete("/", session_controller_1.default.DeleteSession);
exports.default = sessionRouter;
//# sourceMappingURL=session.route.js.map