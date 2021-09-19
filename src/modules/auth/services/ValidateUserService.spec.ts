import { UsersRepository } from './../../users/infra/typeorm/repositories/UsersRepository';
import UpdateRoleDTO from 'src/modules/roles/dtos/UpdateRoleDTO';
import CreateRoleDTO from 'src/modules/roles/dtos/CreateRoleDTO';
import ValidateUserService from './ValidateUserService';
import { Repository } from 'typeorm';
import { User } from '../../users/infra/typeorm/entities/UserEntity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserMock } from '../../users/mocks/UserMockFactory';
import LoginDTO from '../dtos/LoginDTO';
import hashComparePassword from '../../../shared/utils/hashComparePassword';

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
