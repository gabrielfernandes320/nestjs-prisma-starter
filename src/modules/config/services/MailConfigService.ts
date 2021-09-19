import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class MailConfigService {
    public user: string;
    public password: string;
    public host: string;

    public constructor(private configService: ConfigService) {
        this.user = this.configService.get('MAIL_USER');
        this.password = this.configService.get('MAIL_PASSWORD');
        this.host = this.configService.get('MAIL_PASSWORD');
    }
}
