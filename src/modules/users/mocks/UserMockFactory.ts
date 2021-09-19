import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/UserEntity';
import * as Factory from 'factory.ts';
import { name, internet, datatype } from 'faker';
import { RoleMock } from '../../roles/mocks/RoleMockFactory';
import CreateUserDTO from '../dtos/CreateUserDTO';
import UpdateUserDTO from '../dtos/UpdateUserDTO';
import ListUserDTO from '../dtos/ListUserDTO';

export const UserMock = Factory.Sync.makeFactory<User>({
    id: Factory.each((i) => i),
    name: name.firstName(),
    email: internet.email(),
    enabled: datatype.boolean(),
    password: internet.password(),
    roles: RoleMock.buildList(2),
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    setCreated: () => {},
    setUpdatedAt: () => Promise.resolve(),
});

export const CreateUserDtoMock = Factory.Sync.makeFactory<CreateUserDTO>({
    name: name.firstName(),
    email: internet.email(),
    enabled: datatype.boolean(),
    password: internet.password(),
    roles: [{ id: '1' }],
});

export const UpdateUserDtoMock = Factory.Sync.makeFactory<UpdateUserDTO>({
    id: Factory.each((i) => i),
    name: name.firstName(),
    email: internet.email(),
    enabled: datatype.boolean(),
    password: internet.password(),
    roles: [{ id: '1' }],
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
});

export const mockUsersList = UserMock.buildList(10);

export const mockUsersRepository = {
    create: jest.fn((createUserDTO: CreateUserDTO) =>
        plainToClass(User, {
            id: 1,
            ...createUserDTO,
        }),
    ),
    remove: jest.fn(async (id: number) => {
        id = id;
    }),
    update: jest.fn((id: number, updateUserDto: UpdateUserDTO) =>
        plainToClass(User, { id, ...updateUserDto }),
    ),
    findAll: jest.fn((params: ListUserDTO) => ({
        value: mockUsersList,
        total: 10,
        pages: Math.round(10 / params.perPage),
    })),
    findAndCount: jest.fn().mockReturnValue([mockUsersList, 2]),
    findById: jest.fn((id: number) =>
        plainToClass(
            User,
            mockUsersList.find((item) => item.id === id),
        ),
    ),
    findOne: jest.fn((id: number) =>
        mockUsersList.find((item) => item.id === id),
    ),
    findByEmail: jest.fn((email: string) =>
        plainToClass(
            User,
            mockUsersList.find((item) => item.email === email),
        ),
    ),
};
