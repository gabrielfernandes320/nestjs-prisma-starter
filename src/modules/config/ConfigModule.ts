import { Module } from '@nestjs/common';
import {
    ConfigModule as NestConfigModule,
    ConfigService,
} from '@nestjs/config';
import AuthConfigService from './services/AuthConfigService';
import DatabaseConfigService from './services/DatabaseConfigService';
import AppConfigService from './services/JwtConfigService';
import JwtConfigService from './services/JwtConfigService';
import MailConfigService from './services/MailConfigService';

@Module({
    imports: [NestConfigModule],
    controllers: [],
    providers: [ConfigService],
    exports: [
        AppConfigService,
        ConfigService,
        MailConfigService,
        JwtConfigService,
        DatabaseConfigService,
        AuthConfigService,
    ],
})
export class ConfigModule {}
