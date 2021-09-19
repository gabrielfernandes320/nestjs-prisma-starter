import ListUserService from './ListUserService';
import { Test, TestingModule } from '@nestjs/testing';
import {
    UpdateUserDtoMock,
    mockUsersRepository,
    mockUsersList,
} from '../mocks/UserMockFactory';
import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/UserEntity';
import ListUserDTO from '../dtos/ListUserDTO';

describe('ListUserService', () => {
    let service: ListUserService;
    const mockUserDto = UpdateUserDtoMock.build();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListUserService,
                {
                    provide: 'UsersRepository',
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<ListUserService>(ListUserService);
    });

    describe('listUserService', () => {
        it('should return an array of users ', async () => {
            const params: ListUserDTO = { perPage: 10 };

            expect(await service.execute(params)).toEqual({
                value: mockUsersList,
                total: 10,
                pages: Math.round(10 / params.perPage),
            });
        });
    });
});
