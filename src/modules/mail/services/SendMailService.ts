import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export default class SendMailService {
    public constructor(private readonly mailerService: MailerService) {}

    public async execute(sendEmailOptions: ISendMailOptions): Promise<void> {
        await this.mailerService.sendMail(sendEmailOptions);
    }
}
