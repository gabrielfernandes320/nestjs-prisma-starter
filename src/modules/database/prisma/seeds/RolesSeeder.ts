import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/PrismaService';

export default class RoleSeeder {
    private static prismaService = new PrismaService();

    public static async run(): Promise<void> {
        await this.prismaService.role.deleteMany();

        await this.prismaService.role.create({
            data: await this.getRole(),
        });
    }

    private static async getRole(): Promise<Prisma.RoleCreateInput> {
        return {
            name: 'Administrator',
            enabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            permissions: {
                connect: (await this.prismaService.permission.findMany()).map(
                    (Permission) => ({ id: Permission.id }),
                ),
            },
        };
    }
}
