import { Test, TestingModule } from '@nestjs/testing';
import { mockUsersList, mockUsersRepository } from '../mocks/UserMockFactory';
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
                mockUsersList[0],
            );
        });
    });
});
function User(User: any, arg1: User): unknown {
    throw new Error('Function not implemented.');
}
