"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workplace_controller_1 = __importDefault(require("@/controllers/workplace.controller"));
const express_1 = __importDefault(require("express"));
const validatejoi_1 = require("@/validation/validatejoi");
const workplace_joi_1 = require("@/validation/workplace.joi");
const verifyAccessToken_1 = require("@/middlewares/verifyAccessToken");
const workplaceRouter = express_1.default.Router();
workplaceRouter.post("/", verifyAccessToken_1.verifyAccessJWT, (0, validatejoi_1.ValidateJoi)(workplace_joi_1.WorkplaceSchema.Workplace.create_workplace), workplace_controller_1.default.CreateWorkplace);
workplaceRouter.put("/", verifyAccessToken_1.verifyAccessJWT, (0, validatejoi_1.ValidateJoi)(workplace_joi_1.WorkplaceSchema.Workplace.update_workplace), workplace_controller_1.default.UpdateWorkplace);
workplaceRouter.get("/", verifyAccessToken_1.verifyAccessJWT, workplace_controller_1.default.GetWorkplace);
workplaceRouter.delete("/", verifyAccessToken_1.verifyAccessJWT, workplace_controller_1.default.DeletedWorkplace);
exports.default = workplaceRouter;
//# sourceMappingURL=workplace.route.js.map