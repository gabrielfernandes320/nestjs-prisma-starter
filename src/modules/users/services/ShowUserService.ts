import { Inject, Injectable } from '@nestjs/common';
import { User } from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';

@Injectable()
export default class ShowUserService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(id: number): Promise<User> {
        return await this.usersRepository.findById(id, {
            relations: ['roles', 'roles.permissions'],
        });
    }
}
