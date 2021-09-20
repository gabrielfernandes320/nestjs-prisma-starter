import { Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import { JwtService } from '@nestjs/jwt';
import AuthConfigService from '../../config/services/AuthConfigService';
import JwtConfigService from '../../config/services/JwtConfigService';
import { CookieType } from '../enums/CookieTypeEnum';

@Injectable()
export default class GenerateCookieService {
    public constructor(
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private jwtService: JwtService,
        private authConfigService: AuthConfigService,
        private jwtConfigService: JwtConfigService,
    ) {}

    public async execute(type: CookieType, userId: number): Promise<string> {
        const user: any = await this.usersRepository.findById(userId);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
        };

        switch (type) {
            case CookieType.Authentication:
                const token = this.jwtService.sign(userData);

                return `${CookieType.Authentication}=${token}; Domain=${this.authConfigService.cookieDomain}; HttpOnly; Path=/; Max-Age=${this.jwtConfigService.jwtExpirationTime}`;

            case CookieType.Refresh:
                const refreshToken = this.generateRefreshToken(userData);

                return `${CookieType.Refresh}=${refreshToken}; Domain=${this.authConfigService.cookieDomain}; HttpOnly; Path=/; Max-Age=${this.jwtConfigService.jwtRefreshTokenExpirationTime}`;
            default:
                break;
        }

        throw new Error();
    }

    private generateRefreshToken(payload: object) {
        const token = this.jwtService.sign(payload, {
            secret: this.jwtConfigService.jwtRefreshTokenSecret,
            expiresIn: `${this.jwtConfigService.jwtRefreshTokenExpirationTime}s`,
        });

        return token;
    }
}
