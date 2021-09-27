import { Inject, Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import ListPermissionDTO from '../dtos/ListPermissionDTO';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

@Injectable()
export default class ListPermissionService {
    public constructor(
        @Inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    public async execute(
        listPermissionDto: ListPermissionDTO,
    ): Promise<Permission[]> {
        return await this.permissionsRepository.findAll(listPermissionDto);
    }
}
