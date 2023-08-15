"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistedCourseRepository = void 0;
const base_repo_1 = require("./base.repo");
class RegistedCourseRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async FindRegistbyCourseId(id, page, limit) {
        return this.model
            .findOne({ course: id })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate(["course", "workplaces", "student"]);
    }
    async FindRegistbyWorkplaceId(id, page, limit) {
        return this.model
            .find({ workplace: id })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate(["course", "workplaces", "student"]);
    }
    async FindRegistbyStudentId(id) {
        return this.model
            .find({ student: id })
            .populate(["course", "workplaces", "student"]);
    }
}
exports.RegistedCourseRepository = RegistedCourseRepository;
//# sourceMappingURL=regist.course.repo.js.map