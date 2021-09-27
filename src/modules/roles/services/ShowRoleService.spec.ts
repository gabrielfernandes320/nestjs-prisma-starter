import { Test, TestingModule } from '@nestjs/testing';
import { RoleMock } from '../mocks/RoleMockFactory';
import ShowRoleService from './ShowRoleService';

describe('ShowRoleService', () => {
    let service: ShowRoleService;
    const mockRole = RoleMock.build();
    const mockRolesRepository = {
        findById: jest.fn((id: string | number) => mockRole),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowRoleService,
                {
                    provide: 'RolesRepository',
                    useValue: mockRolesRepository,
                },
            ],
        }).compile();

        service = module.get<ShowRoleService>(ShowRoleService);
    });

    describe('validateRole', () => {
        it('should validate if a role password is correct', async () => {
            expect(await service.execute(mockRole.id)).toEqual(mockRole);
        });
    });
});
