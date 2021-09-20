import { Inject, Injectable } from '@nestjs/common';
import IUsersRepository from '../repositories/IUsersRepository';
import { Prisma, User } from '@prisma/client';
import CreateUserDTO from '../dtos/CreateUserDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export default class CreateUserService {
    public constructor(
        @Inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute(userDto: CreateUserDTO): Promise<User> {
        const { roles, ...rest } = userDto;

        return await this.usersRepository.create({
            ...rest,
            roles: { connect: roles },
        });
    }
}
