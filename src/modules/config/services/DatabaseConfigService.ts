import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class DatabaseConfigService {
    public config: any;

    public constructor(private configService: ConfigService) {
        this.config = {
            type: 'postgres',
            host: this.configService.get('DB_HOST'),
            port: this.configService.get('DB_PORT'),
            username: this.configService.get('DB_USER'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_NAME'),
            entities: ['./src/**/*Entity.ts'],
            seeds: ['./src/modules/database/seeds/**/*{.ts,.js}'],
            synchronize: false,
            cli: {
                migrationsDir: './src/modules/database/migrations',
            },
        };
    }
}
