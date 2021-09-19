export interface Options<T> {
    relations?: string[];
}
export default interface IBaseRepository<T> {
    findAll<R>(
        params: R,
        options?: Options<T>,
    ): Promise<{ value: T[]; total: number; pages: number }>;

    findById(id: number, options?: Options<T>): Promise<T>;

    remove(id: number, options?: Options<T>): Promise<void>;

    create(entity: T, options?: Options<T>): Promise<T>;

    update(id: number, entity: T, options?: Options<T>): Promise<T>;
}
