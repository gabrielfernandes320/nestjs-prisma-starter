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

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        ...[
            ShowUserService,
            CreateUserService,
            UpdateUserService,
            ListUserService,
            DeleteUserService,
            ShowUserByEmailService,
        ],
        ...providers,
    ],
    controllers: [UsersController],
    exports: [...[ShowUserByEmailService], ...providers],
})
export class UsersModule {}
