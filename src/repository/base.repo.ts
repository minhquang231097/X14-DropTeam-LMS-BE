import { Model, FilterQuery, QueryOptions, ObjectId, Document } from "mongoose";

export abstract class BaseRepository<T extends Document> {
  constructor(public model: Model<T>) {
    this.model = model;
  }

  async Create(payload: T | any): Promise<T | any> {
    return await this.model.create(payload);
  }

  async FindById(id: string | undefined, populate?: any | null): Promise<T | any> {
    return this.model.findById(id).populate(populate);
  }

  async FindByCondition(filter: any, populate?: any | null): Promise<T | any> {
    return this.model.findOne(filter).populate(populate);
  }

  async FindByConditionAndPagination(filter?: any, page?: any, limit?: any, populate?: any | null): Promise<T[] | any> {
    return this.model
      .find(filter)
      .populate(populate)
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async FindAll(): Promise<T[] | any> {
    return this.model.find();
  }

  async FindAllInfoAndPagination(page?: any, limit?: any, populate?: any | null, sorted?: any): Promise<T[] | any> {
    return await this.model
      .find()
      .sort({ create_at: sorted })
      .skip((page - 1) * limit)
      .limit(limit)
      ?.populate(populate);
  }

  async SearchByCondition(page?: any, limit?: any, query?: any | null, populate?: any | null): Promise<T[] | any> {
    return this.model
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(populate);
  }

  async Count(): Promise<number> {
    return this.model.count();
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

  async FindByIdAndUpdate(id: string | ObjectId, update: any) {
    return this.model.findByIdAndUpdate(id, update);
  }

  async Sort(): Promise<T[] | any> {
    return this.model.find().sort({ create_at: -1 });
  }
}
