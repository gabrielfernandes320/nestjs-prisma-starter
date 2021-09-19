import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PrismaService } from './services/PrismaService';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [join('dist', '**', '*Entity.js')],
                seeds: [join('src', 'seeds', '**', '*{.ts,.js}')],
                synchronize: false,
                cli: {
                    migrationsDir: join('src', 'migrations'),
                },
            }),
        }),
    ],
    controllers: [],
    providers: [PrismaService],
})
export class DatabaseModule {}
