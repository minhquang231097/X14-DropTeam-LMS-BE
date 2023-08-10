"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRepository = void 0;
const base_repo_1 = require("./base.repo");
class LessonRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async CreateLesson(session_id, payload) {
        return this.model.create({ ...payload, session: session_id });
    }
    async FindLessonBySessionId(id, page, limit) {
        return this.model
            .find({ session: id })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("session");
    }
}
exports.LessonRepository = LessonRepository;
//# sourceMappingURL=lesson.repo.js.map