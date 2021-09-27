import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import CreateRoleDto from '../dtos/CreateRoleDTO';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class CreateRoleService {
    public constructor(
        @Inject('RolesRepository') private rolesRepository: IRolesRepository,
    ) {}

    public async execute(role: CreateRoleDto): Promise<Role> {
        const { permissions, ...rest } = role;

        return await this.rolesRepository.create({
            ...rest,
            permissions: { connect: permissions },
        });
    }
}
