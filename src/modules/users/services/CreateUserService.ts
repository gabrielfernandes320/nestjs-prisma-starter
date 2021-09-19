import CreateUserDto from '../dtos/CreateUserDTO';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';
import { plainToClass } from 'class-transformer';

@Injectable()
export default class CreateUserService {
    public constructor(
        @Inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute(user: CreateUserDto): Promise<any> {
        return await this.usersRepository.create(plainToClass(User, user));
    }
}
