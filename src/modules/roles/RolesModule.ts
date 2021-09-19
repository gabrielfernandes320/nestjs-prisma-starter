import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './infra/http/RolesController';
import ShowRoleService from './services/ShowRoleService';
import DeleteRoleService from './services/DeleteRoleService';
import { Role } from './infra/typeorm/entities/RoleEntity';
import providers from './providers';
import CreateRoleService from './services/CreateRoleService';
import ListRoleService from './services/ListRoleService';
import ListPermissionService from './services/ListPermissionService';

import UpdateRoleService from './services/UpdateRoleService';
import { Permission } from './infra/typeorm/entities/PermissionEntity';
import { PermissionsController } from './infra/http/PermissionsController';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Permission])],
    providers: [
        ...[
            ShowRoleService,
            DeleteRoleService,
            CreateRoleService,
            ListRoleService,
            UpdateRoleService,
            ListPermissionService,
        ],
        ...providers,
    ],
    controllers: [RolesController, PermissionsController],
    exports: providers,
})
export class RolesModule {}
