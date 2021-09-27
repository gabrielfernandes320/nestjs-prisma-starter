import { Module } from '@nestjs/common';
import { PrismaService } from './services/PrismaService';

@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService],
})
export class DatabaseModule {}
