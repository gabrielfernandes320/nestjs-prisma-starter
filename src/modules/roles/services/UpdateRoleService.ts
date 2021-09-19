import UpdateRoleDTO from '../dtos/UpdateRoleDTO';
import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../repositories/IRolesRepository';
import { plainToClass } from 'class-transformer';

@Injectable()
export default class UpdateRoleService {
    public constructor(
        @Inject('RolesRepository') private rolesRepository: IRolesRepository,
    ) {}

    public async execute(id: number, role: UpdateRoleDTO): Promise<Role> {
        return await this.rolesRepository.update(id, plainToClass(Role, role));
    }
}
