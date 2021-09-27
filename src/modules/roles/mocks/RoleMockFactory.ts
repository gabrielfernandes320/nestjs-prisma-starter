import { Role } from '@prisma/client';
import * as Factory from 'factory.ts';
import CreateRoleDTO from '../dtos/CreateRoleDTO';
import UpdateRoleDTO from '../dtos/UpdateRoleDTO';

export const RoleMock = Factory.Sync.makeFactory<Role>({
    id: Factory.each((i) => i),
    name: 'Admin',
    enabled: true,
    createdAt: new Date(),
    deletedAt: null,
    reference: 'ADMINISTRATOR',
    updatedAt: new Date(),
});

export const CreateRoleDtoMock = Factory.Sync.makeFactory<CreateRoleDTO>({
    name: 'Admin',
    reference: 'ADMINISTRATOR',
    enabled: true,
    permissions: [{ id: 1 }, { id: 2 }],
});

export const UpdateRoleDtoMock = Factory.Sync.makeFactory<UpdateRoleDTO>({
    id: Factory.each((i) => i),
    name: 'Admin',
    reference: 'ADMINISTRATOR',
    permissions: [{ id: 1 }, { id: 2 }],
});
