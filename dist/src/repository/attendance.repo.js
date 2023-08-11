"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRepository = void 0;
const base_repo_1 = require("./base.repo");
class AttendanceRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async FindAttendanceBySessionId(id) {
        return await this.model
            .find({ session: id })
            .populate(["session", "class"]);
    }
    async FindAttendanceByClassId(id, page, limit) {
        return await this.model
            .find({ class: id })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate(["session", "class"]);
    }
}
exports.AttendanceRepository = AttendanceRepository;
//# sourceMappingURL=attendance.repo.js.map