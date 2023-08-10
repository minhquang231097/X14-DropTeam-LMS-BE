"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessJWT = void 0;
const httpException_1 = __importDefault(require("@/common/httpException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessJWT = (req, res, next) => {
    const authHeader = req.headers.authorization ||
        req.headers.Authorization;
    if (!authHeader)
        return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESSTOKEN_KEY, (err, decoded) => {
        if (err) {
            if (err.name === "JsonWebTokenError") {
                return res.sendStatus(403);
            }
            return res.json(new httpException_1.default("Token Failed!", 401, err.message));
        }
        req.user = decoded;
        next();
    });
};
exports.verifyAccessJWT = verifyAccessJWT;
//# sourceMappingURL=verifyAccessToken.js.map