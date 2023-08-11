"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_controller_1 = __importDefault(require("@/controllers/upload.controller"));
const express_1 = __importDefault(require("express"));
const uploadRouter = express_1.default.Router();
uploadRouter.post("/", upload_controller_1.default);
exports.default = uploadRouter;
//# sourceMappingURL=upload.route.js.map