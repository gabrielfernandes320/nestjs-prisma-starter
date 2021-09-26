import { Prisma, User } from '@prisma/client';
import * as Factory from 'factory.ts';
import { datatype, internet, name } from 'faker';
import CreateUserDTO from '../dtos/CreateUserDTO';
import ListUserDTO from '../dtos/ListUserDTO';
import UpdateUserDTO from '../dtos/UpdateUserDTO';

export const UserMock = Factory.Sync.makeFactory<User>({
    id: Factory.each((i) => i),
    name: name.firstName(),
    email: internet.email(),
    enabled: datatype.boolean(),
    password: internet.password(),
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
});

export const CreateUserDtoMock = Factory.Sync.makeFactory<CreateUserDTO>({
    name: name.firstName(),
    email: internet.email(),
    enabled: datatype.boolean(),
    password: internet.password(),
    roles: [{ id: 1 }],
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
    create: jest.fn((createUserDTO: Prisma.UserCreateInput) => {
        const { roles, ...rest } = createUserDTO;

        return {
            id: 1,
            roles: { connect: roles },
            ...rest,
        };
    }),
    remove: jest.fn(async (id: number) => {
        id = id;
    }),
    update: jest.fn(
        (id: number, updateUserDto: UpdateUserDTO) => updateUserDto,
    ),
    findAll: jest.fn((params: ListUserDTO) => ({
        value: mockUsersList,
        total: 10,
        pages: Math.round(10 / params.perPage),
    })),
    findAndCount: jest.fn().mockReturnValue([mockUsersList, 2]),
    findById: jest.fn((id: number) =>
        mockUsersList.find((item) => item.id === id),
    ),
    findOne: jest.fn((id: number) =>
        mockUsersList.find((item) => item.id === id),
    ),
    findByEmail: jest.fn((email: string) =>
        mockUsersList.find((item) => item.email === email),
    ),
};
