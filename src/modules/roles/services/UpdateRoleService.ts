import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import UpdateRoleDTO from '../dtos/UpdateRoleDTO';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class UpdateRoleService {
    public constructor(
        @Inject('RolesRepository') private rolesRepository: IRolesRepository,
    ) {}

    public async execute(id: number, role: UpdateRoleDTO): Promise<Role> {
        const { permissions, ...rest } = role;

        return await this.rolesRepository.update(id, {
            ...rest,
            permissions: { connect: permissions },
        });
    }
}
