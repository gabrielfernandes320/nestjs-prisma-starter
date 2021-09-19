require('dotenv').config({ path: `.env` });

import { ConfigService } from '@nestjs/config';
import DatabaseConfigService from '../modules/config/services/DatabaseConfigService';

const configService = new ConfigService();
const databaseConfigService = new DatabaseConfigService(configService);

export default {
    ...databaseConfigService.config,
    ...{
        migrations: ['src/migrations/**/*.ts'],
    },
};
