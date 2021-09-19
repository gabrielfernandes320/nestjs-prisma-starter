import { Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import hashComparePassword from '../../../shared/utils/hashComparePassword';
import LoginDTO from '../dtos/LoginDTO';

@Injectable()
export default class ValidateUserService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(loginDto: LoginDTO): Promise<any> {
        const user = await this.usersRepository.findByEmail(loginDto.login);

        if (user) {
            const validPassword = await hashComparePassword(
                loginDto.password,
                user.password,
            );

            if (validPassword) {
                return user;
            }
        }

        return null;
    }
}
