"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("@/common/httpException"));
const httpResponseData_1 = __importDefault(require("@/common/httpResponseData"));
const response_config_1 = require("@/configs/response.config");
const UploadImage = async (req, res) => {
    const file = req.files;
    try {
        let result = [];
        for (let i = 0; i < file.length; i++) {
            result.push(file[i].path);
        }
        res.json(new httpResponseData_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.IMAGE.UPLOAD_SUCCESS, 200, result));
    }
    catch (error) {
        return res.json(new httpException_1.default(response_config_1.RESPONSE_CONFIG.MESSAGE.IMAGE.UPLOAD_FAIL, 400, error.message));
    }
};
exports.default = UploadImage;
//# sourceMappingURL=upload.controller.js.map