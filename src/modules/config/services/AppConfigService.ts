import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppConfigService {
    public appUrl: string;

    public constructor(private configService: ConfigService) {
        this.appUrl = this.configService.get('APP_URL');
    }
}
