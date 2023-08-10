"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRepository = void 0;
const class_model_1 = require("@/models/class.model");
const base_repo_1 = require("./base.repo");
class ClassRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async CreateClass(mentor, workplace, course, end_at, payload) {
        return await this.model.create({
            ...payload,
            mentor,
            workplace,
            course,
            end_at,
        });
    }
    async FindClassByCode(code) {
        return await class_model_1.Class.findOne({ class_code: `${code}` }).populate([
            "mentor",
            "workplace",
            "course",
        ]);
    }
    async FindClassByMentorId(id) {
        return await class_model_1.Class.find({ mentor: `${id}` }).populate([
            "mentor",
            "workplace",
            "course",
        ]);
    }
    async FindClassByWorkplaceId(id) {
        return await class_model_1.Class.find({ workplace: `${id}` }).populate([
            "mentor",
            "workplace",
            "course",
        ]);
    }
    async FindClassByCourseId(id) {
        return await class_model_1.Class.find({ course: `${id}` }).populate([
            "mentor",
            "workplace",
            "course",
        ]);
    }
}
exports.ClassRepository = ClassRepository;
//# sourceMappingURL=class.repo.js.map