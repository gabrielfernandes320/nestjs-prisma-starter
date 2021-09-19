import { UserMock } from './../src/modules/users/mocks/UserMockFactory';
import { UsersModule } from './../src/modules/users/UsersModule';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/users/infra/typeorm/entities/UserEntity';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    const mockUsers = UserMock.buildList(6);

    const mockUsersRepository = {
        findAll: jest
            .fn()
            .mockResolvedValue({ value: mockUsers, total: 6, pages: 2 }),
        findAndCount: jest.fn().mockResolvedValue([mockUsers, 6]),
    };

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [UsersModule],
        })
            .overrideProvider(getRepositoryToken(User))
            .useValue(mockUsersRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (GET)', () =>
        request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect('Content-Type')
            .expect({ value: mockUsers, total: 6, pages: 2 }));
});
