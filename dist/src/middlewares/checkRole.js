"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRole = void 0;
class CheckRole {
    constructor() { }
    static async IsAdmin(req, res, next) {
        const user = req.user;
        user.role === "ADMIN" ? next() : res.sendStatus(400);
    }
    static async IsMentor(req, res, next) {
        const user = req.user;
        if (user.role !== "MENTOR")
            return res.sendStatus(400);
        next();
    }
    static async IsStudent(req, res, next) {
        const user = req.user;
        if (user.role !== "STUDENT")
            return res.sendStatus(400);
        next();
    }
}
exports.CheckRole = CheckRole;
//# sourceMappingURL=checkRole.js.map