import ShowUserService from './ShowUserService';
import { Test, TestingModule } from '@nestjs/testing';
import {
    UpdateUserDtoMock,
    mockUsersRepository,
    mockUsersList,
} from '../mocks/UserMockFactory';
import UpdateUserService from './UpdateUserService';
import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/UserEntity';

describe('ShowUserService', () => {
    let service: ShowUserService;
    const mockUserDto = UpdateUserDtoMock.build();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowUserService,
                {
                    provide: 'UsersRepository',
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<ShowUserService>(ShowUserService);
    });

    describe('showUserService', () => {
        it('should return a user', async () => {
            expect(await service.execute(+mockUsersList[0].id)).toEqual(
                plainToClass(User, mockUsersList[0]),
            );
        });
    });
});
