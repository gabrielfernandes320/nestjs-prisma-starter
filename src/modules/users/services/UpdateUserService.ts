import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import UpdateUserDTO from '../dtos/UpdateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@Injectable()
export default class UpdateUserService {
    public constructor(
        @Inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute(id: number, user: UpdateUserDTO): Promise<User> {
        if (user.password === '') {
            user.password = undefined;
        }

        const { roles, ...rest } = user;

        return await this.usersRepository.update(id, {
            ...rest,
            roles: { connect: roles },
        });
    }
}
