import { Prisma, Role } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/services/PrismaService';
import ListRoleDTO from '../../../dtos/ListRoleDTO';
import RoleNotFoundException from '../../../exceptions/RoleNotFoundException';
import IRolesRepository from '../../../repositories/IRolesRepository';

@Injectable()
export class RolesRepository implements IRolesRepository {
    public constructor(private prisma: PrismaService) {}
    public async findAll(params: ListRoleDTO): Promise<any> {
        const { order, perPage, page, search } = params;

        return await this.prisma.role.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            orderBy: { id: order },
            where: search ? { name: { contains: search } } : {},
        });
    }

    public async findById(id: number): Promise<Role> {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: { permissions: true },
        });

        if (!role) {
            throw new RoleNotFoundException(id);
        }

        return role;
    }

    public async remove(id: number): Promise<void> {
        const affected: any = await this.prisma.role.delete({ where: { id } });

        if (affected.count === 0) {
            throw new RoleNotFoundException(id);
        }
    }

    public async create(data: Prisma.RoleCreateInput): Promise<Role> {
        return await this.prisma.role.create({ data });
    }

    public async update(
        id: number,
        data: Prisma.RoleUpdateInput,
    ): Promise<Role> {
        const affected = await this.prisma.role.updateMany({
            where: { id },
            data,
        });

        if (affected.count === 0) {
            throw new RoleNotFoundException(id);
        }

        return this.findById(id);
    }
}
