import { Test, TestingModule } from '@nestjs/testing';
import hashComparePassword from '../../../shared/utils/hashComparePassword';
import { UserMock } from '../../users/mocks/UserMockFactory';
import LoginDTO from '../dtos/LoginDTO';
import ValidateUserService from './ValidateUserService';

describe('ValidateUserService', () => {
    let service: ValidateUserService;
    const mockUser = UserMock.build();
    const mockUsersRepository = {
        findByEmail: jest.fn((email: string) => mockUser),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: hashComparePassword, useValue: () => true },
                ValidateUserService,
                {
                    provide: 'UsersRepository',
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<ValidateUserService>(ValidateUserService);
    });

    describe('validateUser', () => {
        it('should validate if a user password is correct', async () => {
            const loginDto: LoginDTO = {
                login: mockUser.email,
                password: mockUser.password,
            };

            expect(await service.execute(loginDto)).toEqual(mockUser);
        });
    });
});
