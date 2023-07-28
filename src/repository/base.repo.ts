import { IWrite } from "./base/IWrite";
import { IRead } from "./base/IRead";
import { Collection, Db, InsertOneModel } from "mongodb";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    private readonly _collection: Collection;
    constructor(db: Db, collectionName: string) {
        this._collection = db.collection(collectionName)
    }

    async CreateOne(payload: any): Promise<any> {
        return await this._collection.insertOne(payload)
    }

    async UpdateOne(id: any, payload: any): Promise<any> {
        return await this._collection.updateOne(id, payload)
    }

    async DeleteOne(id: any): Promise<any> {
        return await this._collection.deleteOne(id)
    }

    async FindById(id: any): Promise<any> {
        return await this._collection.findOne({ _id: id })
    }

    async FindByCondition(filter: any): Promise<any> {
        return await this._collection.find(filter)
    }
}