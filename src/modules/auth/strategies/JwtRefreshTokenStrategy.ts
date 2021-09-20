import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';

import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import JwtConfigService from '../../config/services/JwtConfigService';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token',
) {
    public constructor(
        private configService: ConfigService,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        jwtConfigService: JwtConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Refresh,
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConfigService.jwtRefreshTokenSecret,
        });
    }

    public async validate(payload: any) {
        return this.usersRepository.findById(payload.id);
    }
}
