export default interface IBaseRepository<T> {
    findAll<P>(params: P): Promise<T[]>;

    findById(id: number): Promise<T | null>;

    remove(id: number): Promise<void>;

    create<P>(data: P): Promise<T>;

    update<P>(id: number, data: P): Promise<T>;

    findByEmail(email: string): Promise<T>;
}
