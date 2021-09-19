import { Test, TestingModule } from '@nestjs/testing';
import {
    UpdateUserDtoMock,
    mockUsersRepository,
    mockUsersList,
} from '../mocks/UserMockFactory';
import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/UserEntity';
import ShowUserByEmailService from './ShowUserByEmailService';

describe('ShowUserByEmailService', () => {
    let service: ShowUserByEmailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowUserByEmailService,
                {
                    provide: 'UsersRepository',
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<ShowUserByEmailService>(ShowUserByEmailService);
    });

    describe('ShowUserByEmailService', () => {
        it('should return a user', async () => {
            expect(await service.execute(mockUsersList[0].email)).toEqual(
                plainToClass(User, mockUsersList[0]),
            );
        });
    });
});
