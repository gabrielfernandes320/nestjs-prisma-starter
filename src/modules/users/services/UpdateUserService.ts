import { plainToClass } from 'class-transformer';
import UpdateUserDTO from '../dtos/UpdateUserDTO';
import { Inject, Injectable } from '@nestjs/common';
import IUsersRepository from '../repositories/IUsersRepository';
import { User } from '@prisma/client';

@Injectable()
export default class UpdateUserService {
    public constructor(
        @Inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute(id: number, user: UpdateUserDTO): Promise<User> {
        if (user.password === '') {
            user.password = undefined;
        }

        return await this.usersRepository.update(id, user);
    }
}
