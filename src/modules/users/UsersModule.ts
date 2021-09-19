import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infra/http/UsersController';
import { User } from './infra/typeorm/entities/UserEntity';
import providers from './providers';
import ShowUserByEmailService from './services/ShowUserByEmailService';
import UpdateUserService from './services/UpdateUserService';
import ShowUserService from './services/ShowUserService';
import CreateUserService from './services/CreateUserService';
import ListUserService from './services/ListUserService';
import DeleteUserService from './services/DeleteUserService';
import { DatabaseModule } from '../database/DatabaseModule';
import { PrismaService } from '../database/services/PrismaService';

@Module({
    imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
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
