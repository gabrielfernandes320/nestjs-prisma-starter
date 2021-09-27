import { Test } from '@nestjs/testing';
import { Permission } from '@prisma/client';
import { PermissionMock } from '../../mocks/PermissionMockFactory';
import ListPermissionService from '../../services/ListPermissionService';
import { PermissionsController } from './PermissionsController';

describe('PermissionsController', () => {
    let permissionsController: PermissionsController;
    const mockPermissions: Permission[] = PermissionMock.buildList(10);

    const mockListpermissionsService = {
        execute: jest.fn(async () => mockPermissions),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PermissionsController],
            providers: [
                {
                    provide: ListPermissionService,
                    useValue: mockListpermissionsService,
                },
            ],
        }).compile();

        permissionsController = moduleRef.get<PermissionsController>(
            PermissionsController,
        );
    });

    describe('findAll', () => {
        it('should return an array of permissions', async () => {
            expect(await permissionsController.findAll({})).toEqual(
                mockPermissions,
            );
        });
    });
});
