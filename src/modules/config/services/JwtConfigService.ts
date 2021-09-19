import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class JwtConfigService {
    public jwtSecret: string;
    public jwtExpirationTime: string;
    public jwtRefreshTokenSecret: string;
    public jwtRefreshTokenExpirationTime: string;

    public constructor(private configService: ConfigService) {
        this.jwtSecret = this.configService.get('JWT_SECRET');
        this.jwtExpirationTime = this.configService.get('JWT_EXPIRATION_TIME');
        this.jwtRefreshTokenSecret = this.configService.get(
            'JWT_REFRESH_TOKEN_SECRET',
        );
        this.jwtRefreshTokenExpirationTime = this.configService.get(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        );
    }
}
