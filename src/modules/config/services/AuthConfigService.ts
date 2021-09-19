import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthConfigService {
    public cookieDomain: string;
    public cookieExpiration: string;

    public constructor(private configService: ConfigService) {
        this.cookieDomain = this.configService.get('AUTH_COOKIE_DOMAIN');
        this.cookieExpiration = this.configService.get(
            'AUTH_COOKIE_EXPIRATION',
        );
    }
}
