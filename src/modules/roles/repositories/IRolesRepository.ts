import { Prisma, Role } from '@prisma/client';
import ListRoleDTO from '../dtos/ListRoleDTO';
export default interface IRolesRepository {
    findAll(params: ListRoleDTO): Promise<any>;

    findById(id: number): Promise<Role | null>;

    remove(id: number): Promise<void>;

    create(data: Prisma.RoleCreateInput): Promise<Role>;

    update(id: number, data: Prisma.RoleUpdateInput): Promise<Role>;
}
