import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    public async onModuleInit() {
        await this.$connect();
        await this.useSoftDelete();
    }

    private async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }

    private async useSoftDelete() {
        this.$use(async (params, next) => {
            if (params.model == Prisma.ModelName.User) {
                if (params.action == 'delete') {
                    params.action = 'update';
                    params.args['data'] = { deletedAt: new Date() };
                }

                if (params.action == 'deleteMany') {
                    params.action = 'updateMany';

                    if (params.args.data != undefined) {
                        params.args.data['deletedAt'] = {
                            deletedAt: new Date(),
                        };
                    } else {
                        params.args['data'] = {
                            deleted: { deletedAt: new Date() },
                        };
                    }
                }
            }

            return next(params);
        });

        this.$use(async (params, next) => {
            if (params.model == Prisma.ModelName.User) {
                if (params.action == 'findUnique') {
                    // Change to findFirst - you cannot filter
                    // by anything except ID / unique with findUnique
                    params.action = 'findFirst';
                    // Add 'deleted' filter
                    // ID filter maintained
                    params.args.where['deletedAt'] = null;
                }

                if (params.action == 'findMany') {
                    // Find many queries
                    if (params.args.where != undefined) {
                        if (params.args.where.deletedAt == undefined) {
                            // Exclude deleted records if they have not been expicitly requested
                            params.args.where['deletedAt'] = null;
                        }
                    } else {
                        params.args['where'] = { deletedAt: null };
                    }
                }
            }

            return next(params);
        });

        this.$use(async (params, next) => {
            if (params.model == Prisma.ModelName.User) {
                if (params.action == 'update') {
                    // Change to updateMany - you cannot filter
                    // by anything except ID / unique with findUnique
                    params.action = 'updateMany';
                    // Add 'deleted' filter
                    // ID filter maintained
                    params.args.where['deletedAt'] = null;
                }

                if (params.action == 'updateMany') {
                    if (params.args.where != undefined) {
                        params.args.where['deletedAt'] = null;
                    } else {
                        params.args['where'] = { deletedAt: null };
                    }
                }
            }

            return next(params);
        });
    }
}
