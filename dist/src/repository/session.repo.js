"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRepository = void 0;
const base_repo_1 = require("./base.repo");
class SessionRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async CreateSession(course_id, payload) {
        return await this.model.create({ ...payload, course: course_id });
    }
    async FindSessionByCode(session_code) {
        const session = await this.model
            .findOne({ session_code })
            .populate(["course", "class"]);
        return session?.toObject();
    }
    async FindSessionByCourseId(id) {
        const session = await this.model
            .findOne({ course: id })
            .populate(["course", "class"]);
        return session;
    }
    async FindSessionByClassId(id) {
        const session = await this.model
            .findOne({ class: id })
            .populate(["course", "class"]);
        return session;
    }
}
exports.SessionRepository = SessionRepository;
//# sourceMappingURL=session.repo.js.map