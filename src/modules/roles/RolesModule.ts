import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/PrismaService';
import { PermissionsController } from './infra/http/PermissionsController';
import { RolesController } from './infra/http/RolesController';
import providers from './providers';
import CreateRoleService from './services/CreateRoleService';
import DeleteRoleService from './services/DeleteRoleService';
import ListPermissionService from './services/ListPermissionService';
import ListRoleService from './services/ListRoleService';
import ShowRoleService from './services/ShowRoleService';
import UpdateRoleService from './services/UpdateRoleService';

@Module({
    imports: [],
    providers: [
        ...[
            ShowRoleService,
            DeleteRoleService,
            CreateRoleService,
            ListRoleService,
            UpdateRoleService,
            ListPermissionService,
            PrismaService,
        ],
        ...providers,
    ],
    controllers: [RolesController, PermissionsController],
    exports: providers,
})
export class RolesModule {}
