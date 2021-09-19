import UpdateRoleDTO from 'src/modules/roles/dtos/UpdateRoleDTO';
import CreateRoleDTO from 'src/modules/roles/dtos/CreateRoleDTO';
import {
    RoleMock,
    CreateRoleDtoMock,
    UpdateRoleDtoMock,
} from '../../mocks/RoleMockFactory';
import { RolesController } from './RolesController';
import ListRoleService from '../../services/ListRoleService';
import { Role } from '../typeorm/entities/RoleEntity';
import { Test } from '@nestjs/testing';
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import CreateRoleService from '../../services/CreateRoleService';
import UpdateRoleService from '../../services/UpdateRoleService';
import DeleteRoleService from '../../services/DeleteRoleService';
import ShowRoleService from '../../services/ShowRoleService';
import { datatype } from 'faker';
import ListRolesDTO from '../../dtos/ListRoleDTO';

describe('RolesController', () => {
    let rolesController: RolesController;
    const mockRoles: Role[] = RoleMock.buildList(10);

    const mockListRolesService = {
        execute: jest.fn(async () => mockRoles),
    };
    const mockCreateRolesService = {
        execute: jest.fn(async (createRoleDto: CreateRoleDTO) => ({
            id: datatype.number(),
            ...createRoleDto,
        })),
    };
    const mockUpdateRoleService = {
        execute: jest.fn(async (id: number, updateRoleDto: UpdateRoleDTO) => ({
            id,
            ...updateRoleDto,
        })),
    };
    const mockDeleteRoleService = {
        execute: jest.fn(async (id: Number) => {
            id = id;

            return;
        }),
    };

    const mockShowRoleService = {
        execute: jest.fn(async () => mockRoles[0]),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [
                {
                    provide: ListRoleService,
                    useValue: mockListRolesService,
                },
                {
                    provide: CreateRoleService,
                    useValue: mockCreateRolesService,
                },
                {
                    provide: UpdateRoleService,
                    useValue: mockUpdateRoleService,
                },
                {
                    provide: DeleteRoleService,
                    useValue: mockDeleteRoleService,
                },
                {
                    provide: ShowRoleService,
                    useValue: mockShowRoleService,
                },
                JwtAuthenticationGuard,
            ],
        }).compile();

        rolesController = moduleRef.get<RolesController>(RolesController);
    });

    describe('findAll', () => {
        const mockParams: ListRolesDTO = {};

        it('should return an array of roles', async () => {
            expect(await rolesController.findAll(mockParams)).toEqual(
                mockRoles,
            );
        });
    });

    describe('show', () => {
        it('should return a role', async () => {
            expect(await rolesController.findOne(0)).toEqual(mockRoles[0]);

            expect(mockShowRoleService.execute).toHaveBeenCalledWith(
                expect.any(Number),
            );
        });
    });

    describe('create', () => {
        it('should create a role', async () => {
            const mockRoleDto = CreateRoleDtoMock.build();

            expect(await rolesController.create(mockRoleDto)).toEqual({
                id: expect.any(Number),
                ...mockRoleDto,
            });

            expect(mockCreateRolesService.execute).toHaveBeenCalledWith(
                mockRoleDto,
            );
        });
    });

    describe('update', () => {
        it('should update a role', async () => {
            const mockRoleDto = UpdateRoleDtoMock.build();

            expect(
                await rolesController.update(+mockRoleDto.id, mockRoleDto),
            ).toEqual({
                id: expect.any(Number),
                ...mockRoleDto,
            });

            expect(mockUpdateRoleService.execute).toHaveBeenCalledWith(
                +mockRoleDto.id,
                mockRoleDto,
            );
        });
    });

    describe('remove', () => {
        it('should remove a role', async () => {
            expect(await rolesController.remove(1)).toEqual(undefined);

            expect(mockDeleteRoleService.execute).toHaveBeenCalled();
        });
    });
});
