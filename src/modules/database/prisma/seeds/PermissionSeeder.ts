import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/PrismaService';

export default class PermissionSeeder {
    private static prismaService = new PrismaService();

    public static async run(): Promise<void> {
        await this.prismaService.permission.deleteMany();

        await this.prismaService.permission.createMany({
            data: this.getPermissions(),
        });
    }

    private static getPermissions(): Prisma.PermissionCreateManyInput[] {
        return [
            {
                name: 'List Roles',
                reference: 'LIST:ROLES',
                action: 'read',
                resource: 'role',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Create Roles',
                reference: 'CREATE:ROLES',
                action: 'create',
                resource: 'role',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Update Roles',
                reference: 'UPDATE:ROLES',
                action: 'update',
                resource: 'role',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Delete Roles',
                reference: 'DELETE:ROLES',
                action: 'delete',
                resource: 'role',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Show Roles',
                reference: 'SHOW:ROLES',
                resource: 'role',
                action: 'read',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'List Users',
                reference: 'LIST:USERS',
                resource: 'users',
                action: 'read',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Create Users',
                reference: 'CREATE:USERS',
                resource: 'users',
                action: 'create',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Update Users',
                reference: 'UPDATE:USERS',
                resource: 'users',
                action: 'update',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Delete Users',
                reference: 'DELETE:USERS',
                resource: 'users',
                action: 'delete',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Show Users',
                reference: 'SHOW:USERS',
                resource: 'users',
                action: 'read',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }
}
