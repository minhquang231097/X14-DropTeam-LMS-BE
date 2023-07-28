export interface IRead<T> {
    FindById(id: string): Promise<T>
    FindByCondition(filter: T): Promise<any>
}