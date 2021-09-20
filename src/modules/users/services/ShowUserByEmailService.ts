import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import IUsersRepository from '../repositories/IUsersRepository';

@Injectable()
export default class ShowUserByEmailService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(email: string): Promise<User> {
        return await this.usersRepository.findByEmail(email);
    }
}
