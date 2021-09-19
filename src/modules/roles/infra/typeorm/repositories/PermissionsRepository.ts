import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ListPermissionsDTO from 'src/modules/roles/dtos/ListPermissionDTO';
import IPermissionsRepository from 'src/modules/roles/repositories/IPermissionsRepository';
import { ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../../../shared/infra/typeorm/repositories/BaseRepository';
import { Permission } from '../entities/PermissionEntity';

@Injectable()
export class PermissionsRepository
    extends BaseRepository(Permission)
    implements IPermissionsRepository
{
    public constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>,
    ) {
        super();
    }

    public async findAll(params: ListPermissionsDTO): Promise<any> {
        const { page, perPage, search, order } = params;

        const [result, total] = await this.permissionsRepository.findAndCount({
            where: { name: ILike(`%${search ?? ''}%`) },
            order: { id: order },
            take: perPage,
            skip: perPage * (page - 1),
        });

        return {
            value: result,
            total: total,
            pages: Math.round(total / perPage),
        };
    }
}
