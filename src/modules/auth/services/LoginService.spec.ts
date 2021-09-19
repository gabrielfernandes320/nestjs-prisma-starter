import { Test, TestingModule } from '@nestjs/testing';
import {
    UserMock,
    mockUsersRepository,
    mockUsersList,
} from '../../users/mocks/UserMockFactory';
import LoginDTO from '../dtos/LoginDTO';
import hashComparePassword from '../../../shared/utils/hashComparePassword';
import LoginService from './LoginService';
import ShowUserByEmailService from '../../users/services/ShowUserByEmailService';
import { CookieType } from '../enums/CookieTypeEnum';
import GenerateCookieService from './GenerateCookieService';
import ValidateUserService from './ValidateUserService';

describe('LoginService', () => {
    let service: LoginService;
    const mockShowUserByEmailService = {
        execute: jest.fn((email: string) =>
            mockUsersRepository.findByEmail(email),
        ),
    };
    const mockGenerateCookieService = {
        execute: jest.fn(
            (cookieType: CookieType, userId: number) =>
                `${cookieType}=${'asd9a8sdy9a8sda9s8dy98y9238y49as8duasduasd9'}; Domain=${'Domain'}; HttpOnly; Path=/; Max-Age=${2500}`,
        ),
    };
    const mockValidateUserService = {
        execute: jest.fn((loginDto: LoginDTO) => mockUsersList[0]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: hashComparePassword, useValue: () => true },
                LoginService,
                {
                    provide: 'UsersRepository',
                    useValue: mockUsersRepository,
                },
                {
                    provide: ShowUserByEmailService,
                    useValue: mockShowUserByEmailService,
                },
                {
                    provide: GenerateCookieService,
                    useValue: mockGenerateCookieService,
                },
                {
                    provide: ValidateUserService,
                    useValue: mockValidateUserService,
                },
            ],
        }).compile();

        service = module.get<LoginService>(LoginService);
    });

    describe('LoginService', () => {
        it('should return the user, jwt token and jwt refresh token', async () => {
            const loginDto: LoginDTO = {
                login: mockUsersList[0].email,
                password: mockUsersList[0].password,
            };

            expect(await service.execute(loginDto)).toEqual({
                user: mockUsersList[0],
                cookie: `${
                    CookieType.Authentication
                }=${'asd9a8sdy9a8sda9s8dy98y9238y49as8duasduasd9'}; Domain=${'Domain'}; HttpOnly; Path=/; Max-Age=${2500}`,
                cookieRefreshToken: `${
                    CookieType.Refresh
                }=${'asd9a8sdy9a8sda9s8dy98y9238y49as8duasduasd9'}; Domain=${'Domain'}; HttpOnly; Path=/; Max-Age=${2500}`,
            });
        });
    });
});
