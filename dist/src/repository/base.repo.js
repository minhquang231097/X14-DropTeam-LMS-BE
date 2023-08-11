"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: model
        });
        this.model = model;
    }
    async Create(payload) {
        const createdEntity = new this.model(payload);
        return await createdEntity.save();
    }
    async FindById(id, populate) {
        return this.model.findById(`${id}`).populate(populate);
    }
    async FindByCondition(filter, populate) {
        return this.model.findOne(filter).populate(populate);
    }
    async FindByConditionAndPagination(page, limit, filter, populate) {
        return this.model
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate(populate);
    }
    async FindAll() {
        return this.model.find();
    }
    async FindAllInfoAndPagination(page, limit, populate) {
        return await this.model
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            ?.populate(populate);
    }
    async Search(page, limit, populate, searchTerm, searchField) {
        const query = {};
        if (searchTerm && searchField) {
            query[searchField] = { $regex: searchTerm, $options: "i" };
        }
        return await this.model
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate(populate);
    }
    async Aggregate(option) {
        return this.model.aggregate(option);
    }
    async Populate(result, option) {
        return await this.model.populate(result, option);
    }
    async DeleteOne(id) {
        return this.model.deleteOne({ _id: id });
    }
    async DeleteMany(id) {
        return this.model.deleteMany({ _id: { $in: id } });
    }
    async DeleteByCondition(filter) {
        return this.model.deleteMany(filter);
    }
    async FindByConditionAndUpdate(filter, update) {
        return this.model.findOneAndUpdate(filter, update);
    }
    async UpdateMany(filter, update, option) {
        return this.model.updateMany(filter, update, option);
    }
    async FindByIdAndUpdate(id, update) {
        return this.model.findByIdAndUpdate(id, update);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repo.js.map