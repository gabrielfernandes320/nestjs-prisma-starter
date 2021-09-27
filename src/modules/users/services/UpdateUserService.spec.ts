import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import {
    mockUsersList,
    mockUsersRepository,
    UpdateUserDtoMock,
} from '../mocks/UserMockFactory';
import UpdateUserService from './UpdateUserService';

describe('DeleteUserService', () => {
    let service: UpdateUserService;
    const mockUserDto = UpdateUserDtoMock.build();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserService,
                {
                    provide: 'UsersRepository',
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<UpdateUserService>(UpdateUserService);
    });

    describe('updateUserService', () => {
        it('should update and return the user', async () => {
            expect(
                await service.execute(+mockUsersList[0].id, mockUserDto),
            ).toEqual(plainToClass(User, mockUserDto));
        });
    });
});
