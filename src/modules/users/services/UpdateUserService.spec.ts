import DeleteUserService from './DeleteUserService';
import { Test, TestingModule } from '@nestjs/testing';
import {
    UpdateUserDtoMock,
    mockUsersRepository,
    mockUsersList,
} from '../mocks/UserMockFactory';
import UpdateUserService from './UpdateUserService';
import { plainToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/UserEntity';

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
