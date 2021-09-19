import { Inject, Injectable } from '@nestjs/common';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class DeleteRoleService {
    public constructor(
        @Inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(id: number) {
        await this.rolesRepository.remove(id);
    }
}
