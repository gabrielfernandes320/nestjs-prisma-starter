import { PermissionMock } from '../../mocks/PermissionMockFactory';
import { PermissionsController } from './PermissionsController';
import ListPermissionService from '../../services/ListPermissionService';
import { Permission } from '../typeorm/entities/PermissionEntity';
import ListPermissionDTO from '../../dtos/ListPermissionDTO';
import { Test } from '@nestjs/testing';
import { Controller } from '@nestjs/common';
import { string } from '@hapi/joi';

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
