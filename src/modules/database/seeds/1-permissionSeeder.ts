import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Permission } from '../../roles/infra/typeorm/entities/PermissionEntity';

export default class Permissions implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const repository = connection.getRepository(Permission);

        await repository.delete({});

        await repository.save(this.getPermissions());
    }

    private getPermissions(): Partial<Permission>[] {
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
