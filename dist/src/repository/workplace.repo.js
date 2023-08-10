"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkplaceRepository = void 0;
const base_repo_1 = require("./base.repo");
class WorkplaceRepository extends base_repo_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async FindWorkplaceByCode(workplace_code) {
        const workplace = await this.model.findOne({ workplace_code });
        return workplace?.toObject();
    }
}
exports.WorkplaceRepository = WorkplaceRepository;
//# sourceMappingURL=workplace.repo.js.map