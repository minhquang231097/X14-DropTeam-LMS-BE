"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRepository = void 0;
const base_repo_1 = require("./base.repo");
class FeedbackRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async FindFeedbackByCourseId(id) {
        return await this.model
            .find({ course: id })
            .populate(["course", "student"]);
    }
    async FindFeedbackByStudentId(id) {
        return await this.model
            .find({ student: id })
            .populate(["course", "student"]);
    }
}
exports.FeedbackRepository = FeedbackRepository;
//# sourceMappingURL=feedback.repo.js.map