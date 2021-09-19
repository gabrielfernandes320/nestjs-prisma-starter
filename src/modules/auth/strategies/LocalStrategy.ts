import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ValidateUserService from '../services/ValidateUserService';
import LoginDTO from '../dtos/LoginDTO';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private validateUserService: ValidateUserService) {
        super({ usernameField: 'login' });
    }

    public async validate(username: string, password: string): Promise<any> {
        const userLogin: LoginDTO = {
            login: username,
            password: password,
        };
        const user = await this.validateUserService.execute(userLogin);

        if (!user) {
            throw new HttpException(
                'Usuário ou senha inválida',
                HttpStatus.FORBIDDEN,
            );
        }

        return user;
    }
}
