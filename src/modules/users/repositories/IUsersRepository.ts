import { Prisma, User } from '@prisma/client';
import ListUserDTO from '../dtos/ListUserDTO';
export default interface IUsersRepository {
    findAll(params: ListUserDTO): Promise<any>;

    findById(id: number): Promise<User | null>;

    remove(id: number): Promise<void>;

    create(data: Prisma.UserCreateInput): Promise<User>;

    update(id: number, user: Prisma.UserUpdateInput): Promise<User>;

    findByEmail(email: string): Promise<User>;
}
