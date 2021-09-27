import { Permission } from '@prisma/client';
import * as Factory from 'factory.ts';

export const PermissionMock = Factory.Sync.makeFactory<Permission>({
    id: Factory.each((i) => i),
    name: 'List users',
    action: 'read',
    createdAt: new Date(),
    deletedAt: null,
    reference: 'LIST:USERS',
    resource: 'user',
    updatedAt: new Date(),
});
