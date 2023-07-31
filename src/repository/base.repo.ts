import { Model, FilterQuery, QueryOptions, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
    constructor(private readonly model: Model<T>) { }

    async Create(doc: any): Promise<any> {
        const createdEntity = new this.model(doc);
        return await createdEntity.save();
    }

    async FindById(id: string, option?: QueryOptions): Promise<any> {
        return this.model.findById(id, option);
    }

    async FindByCondition(
        filter: any,
        field?: any | null,
        option?: any | null,
        populate?: any | null,
    ): Promise<any> {
        return this.model.findOne(filter, field, option).populate(populate);
    }

    async GetByCondition(
        filter: any,
        field?: any | null,
        option?: any | null,
        populate?: any | null,
    ): Promise<T[]> {
        return this.model.find(filter, field, option).populate(populate);
    }

    async FindAll(): Promise<T[]> {
        return this.model.find();
    }

    async Aggregate(option: any) {
        return this.model.aggregate(option);
    }

    async Populate(result: T[], option: any) {
        return await this.model.populate(result, option);
    }

    async DeleteOne(id: string) {
        return this.model.deleteOne({ _id: id } as FilterQuery<T>);
    }

    async DeleteMany(id: string[]) {
        return this.model.deleteMany({ _id: { $in: id } } as FilterQuery<T>);
    }

    async DeleteByCondition(filter: any) {
        return this.model.deleteMany(filter);
    }

    async FindByConditionAndUpdate(filter: any, update: any) {
        return this.model.findOneAndUpdate(filter as FilterQuery<T>, update);
    }

    async UpdateMany(filter: any, update: any, option?: any | null) {
        return this.model.updateMany(filter, update, option);
    }

    async FindByIdAndUpdate(id: any, update: any) {
        return this.model.findByIdAndUpdate(id, update);
    }
}
