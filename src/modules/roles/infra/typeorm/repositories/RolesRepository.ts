import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ListRolesDTO from 'src/modules/roles/dtos/ListRoleDTO';
import IRolesRepository from 'src/modules/roles/repositories/IRolesRepository';
import { ILike, Repository } from 'typeorm';
import { Role } from '../entities/RoleEntity';
import CreateRoleDTO from 'src/modules/roles/dtos/CreateRoleDTO';
import { plainToClass } from 'class-transformer';
import UpdateRoleDTO from 'src/modules/roles/dtos/UpdateRoleDTO';
import RoleNotFoundException from 'src/modules/roles/exceptions/RoleNotFoundException';
import { BaseRepository } from '../../../../../shared/infra/typeorm/repositories/BaseRepository';

@Injectable()
export class RolesRepository
    extends BaseRepository(Role)
    implements IRolesRepository {
    public constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {
        super();
    }

    public async findAll(params: ListRolesDTO): Promise<any> {
        const { page, perPage, search, order } = params;

        const [result, total] = await this.rolesRepository.findAndCount({
            where: { name: ILike(`%${search ?? ''}%`) },
            order: { id: order },
            take: perPage,
            skip: perPage * (page - 1),
            relations: ['permissions'],
        });

        return {
            value: result,
            total: total,
            pages: Math.round(total / perPage),
        };
    }
}
