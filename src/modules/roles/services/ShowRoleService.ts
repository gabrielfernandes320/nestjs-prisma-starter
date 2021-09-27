import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class ShowRoleService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(id: number): Promise<Role> {
        return await this.rolesRepository.findById(id);
    }
}
