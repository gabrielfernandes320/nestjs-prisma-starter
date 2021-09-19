import ListUserDTO from 'src/modules/users/dtos/ListUserDTO';
import { UsersController } from './UsersController';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import UpdateUserDTO from '../../dtos/UpdateUserDTO';
import {
    CreateUserDtoMock,
    UpdateUserDtoMock,
} from '../../mocks/UserMockFactory';
import CreateUserService from '../../services/CreateUserService';
import DeleteUserService from '../../services/DeleteUserService';
import ListUserService from '../../services/ListUserService';
import ShowUserService from '../../services/ShowUserService';
import UpdateUserService from '../../services/UpdateUserService';
import { mockUsersList } from '../../mocks/UserMockFactory';
import { classToPlain, TransformClassToPlain } from 'class-transformer';

describe('UsersController', () => {
    let controller: UsersController;

    const mockListUsersService = {
        execute: jest.fn(async () => mockUsersList),
    };
    const mockCreateUsersService = {
        execute: jest.fn(async (createUserDto: CreateUserDTO) => ({
            id: datatype.number(),
            ...createUserDto,
        })),
    };
    const mockUpdateUserService = {
        execute: jest.fn(async (id: number, updateUserDto: UpdateUserDTO) => ({
            id,
            ...updateUserDto,
        })),
    };
    const mockDeleteUserService = {
        execute: jest.fn(async (id: Number) => {
            id = id;

            return;
        }),
    };

    const mockShowUserService = {
        execute: jest.fn(async (id: number) => {
            const user = mockUsersList[id];
            delete user.password;
            return user;
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: ListUserService,
                    useValue: mockListUsersService,
                },
                {
                    provide: CreateUserService,
                    useValue: mockCreateUsersService,
                },
                {
                    provide: UpdateUserService,
                    useValue: mockUpdateUserService,
                },
                {
                    provide: DeleteUserService,
                    useValue: mockDeleteUserService,
                },
                {
                    provide: ShowUserService,
                    useValue: mockShowUserService,
                },
                JwtAuthenticationGuard,
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    describe('findAll', () => {
        const mockParams: ListUserDTO = {};

        it('should return an array of users', async () => {
            expect(await controller.findAll(mockParams)).toEqual(mockUsersList);
        });
    });

    describe('show', () => {
        it('should return a user', async () => {
            expect(await controller.findOne(0)).toEqual(mockUsersList[0]);

            expect(mockShowUserService.execute).toHaveBeenCalledWith(
                expect.any(Number),
            );
        });
    });

    describe('create', () => {
        it('should create a user', async () => {
            const mockUserDto = CreateUserDtoMock.build();

            expect(await controller.create(mockUserDto)).toEqual({
                id: expect.any(Number),
                ...mockUserDto,
            });

            expect(mockCreateUsersService.execute).toHaveBeenCalledWith(
                mockUserDto,
            );
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            const mockUserDto = UpdateUserDtoMock.build();

            expect(
                await controller.update(+mockUserDto.id, mockUserDto),
            ).toEqual({
                id: expect.any(Number),
                ...mockUserDto,
            });

            expect(mockUpdateUserService.execute).toHaveBeenCalledWith(
                +mockUserDto.id,
                mockUserDto,
            );
        });
    });

    describe('remove', () => {
        it('should remove a user', async () => {
            expect(await controller.remove(1)).toEqual(undefined);

            expect(mockDeleteUserService.execute).toHaveBeenCalled();
        });
    });
});
