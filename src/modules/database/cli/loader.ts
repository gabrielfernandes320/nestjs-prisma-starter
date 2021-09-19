require('dotenv').config({ path: `.env` });

import { ConfigService } from '@nestjs/config';
import DatabaseConfigService from '../../config/services/DatabaseConfigService';

const configService = new ConfigService();
const databaseConfigService = new DatabaseConfigService(configService);

export default {
    ...databaseConfigService.config,
    ...{
        migrations: ['./src/modules/database/migrations/**/*.ts'],
        seeds: ['./src/modules/database/seeds/**/*.ts'],
    },
};
