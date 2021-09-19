import { Inject, Injectable } from '@nestjs/common';
import ListRoleDTO from '../dtos/ListRoleDTO';
import { Role } from '../infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class ListRoleService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(listRoleDto: ListRoleDTO): Promise<any> {
        return await this.rolesRepository.findAll(listRoleDto, {
            relations: ['roles'],
        });
    }
}
