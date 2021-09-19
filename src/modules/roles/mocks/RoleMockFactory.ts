import UpdateRoleDTO from '../dtos/UpdateRoleDTO';
import CreateRoleDTO from '../dtos/CreateRoleDTO';
import { PermissionMock } from './PermissionMockFactory';
import { Role } from '../infra/typeorm/entities/RoleEntity';
import * as Factory from 'factory.ts';

export const RoleMock = Factory.Sync.makeFactory<Role>({
    id: Factory.each((i) => i),
    name: 'Admin',
    enabled: true,
    createdAt: new Date(),
    deletedAt: null,
    reference: 'ADMINISTRATOR',
    updatedAt: new Date(),
    permissions: PermissionMock.buildList(2),
    setCreated: () => {},
    setUpdatedAt: () => {},
});

export const CreateRoleDtoMock = Factory.Sync.makeFactory<CreateRoleDTO>({
    name: 'Admin',
    reference: 'ADMINISTRATOR',
    permissions: [{ id: 1 }, { id: 2 }],
});

export const UpdateRoleDtoMock = Factory.Sync.makeFactory<UpdateRoleDTO>({
    id: Factory.each((i) => i),
    name: 'Admin',
    reference: 'ADMINISTRATOR',
    permissions: [{ id: 1 }, { id: 2 }],
});
