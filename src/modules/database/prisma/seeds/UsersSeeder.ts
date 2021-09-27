import { Prisma } from '@prisma/client';
import hashPassword from '../../../../shared/utils/hashPassword';
import { PrismaService } from '../../services/PrismaService';

export default class UserSeeder {
    private static prismaService = new PrismaService();

    public static async run(): Promise<void> {
        await this.prismaService.user.deleteMany();

        await this.prismaService.user.create({
            data: await this.getUser(),
        });
    }

    private static async getUser(): Promise<Prisma.UserCreateInput> {
        return {
            name: 'administrator',
            email: 'admin@gmail.com',
            password: await hashPassword('12345678'),
            enabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            roles: {
                connect: (await this.prismaService.role.findMany()).map(
                    (role) => ({ id: role.id }),
                ),
            },
        };
    }
}
