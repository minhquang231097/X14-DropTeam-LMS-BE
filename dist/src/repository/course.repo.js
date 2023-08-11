"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const base_repo_1 = require("./base.repo");
class CourseRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async FindCourseByCode(course_code) {
        const course = await this.model.findOne({ course_code }).populate("workplace");
        return course?.toObject();
    }
}
exports.CourseRepository = CourseRepository;
//# sourceMappingURL=course.repo.js.map