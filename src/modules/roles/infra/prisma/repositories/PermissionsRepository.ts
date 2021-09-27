import { Injectable } from '@nestjs/common';
import ListPermissionsDTO from 'src/modules/roles/dtos/ListPermissionDTO';
import IPermissionsRepository from 'src/modules/roles/repositories/IPermissionsRepository';
import { PrismaService } from '../../../../database/services/PrismaService';

@Injectable()
export class PermissionsRepository implements IPermissionsRepository {
    public constructor(private prisma: PrismaService) {}

    public async findAll(params: ListPermissionsDTO): Promise<any> {
        const { order, perPage, page, search } = params;

        return await this.prisma.permission.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            orderBy: { id: order },
            where: search ? { name: { contains: search } } : {},
        });
    }
}
