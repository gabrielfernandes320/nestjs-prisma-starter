import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/DatabaseModule';
import { PrismaService } from '../database/services/PrismaService';
import { UsersController } from './infra/http/UsersController';
import providers from './providers';
import CreateUserService from './services/CreateUserService';
import DeleteUserService from './services/DeleteUserService';
import ListUserService from './services/ListUserService';
import ShowUserByEmailService from './services/ShowUserByEmailService';
import ShowUserService from './services/ShowUserService';
import UpdateUserService from './services/UpdateUserService';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...[
            ShowUserService,
            CreateUserService,
            UpdateUserService,
            ListUserService,
            DeleteUserService,
            ShowUserByEmailService,
            PrismaService,
        ],
        ...providers,
    ],
    controllers: [UsersController],
    exports: [...[ShowUserByEmailService], ...providers],
})
export class UsersModule {}
