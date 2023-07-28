export interface IWrite<T> {
    CreateOne(payload: T): Promise<T>
    UpdateOne(id: string, payload: T): Promise<T>
    DeleteOne(id: string): Promise<any>
}