import { AuthModule } from './modules/auth/AuthModule';
import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/RolesModule';
import { UsersModule } from './modules/users/UsersModule';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './modules/database/DatabaseModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                PORT: Joi.number(),
            }),
        }),
        DatabaseModule,
        UsersModule,
        RolesModule,
        AuthModule,
    ],

    controllers: [],
    providers: [],
})
export class AppModule {}
