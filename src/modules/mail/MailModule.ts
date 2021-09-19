import { Module } from '@nestjs/common';
import SendMailService from './services/SendMailService';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    service: configService.get('MAIL_SERVICE'),
                    host: configService.get('MAIL_HOST'),
                    auth: {
                        user: configService.get('MAIL_USER'),
                        pass: configService.get('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: `<${configService.get('MAIL_USER')}>`,
                },
                template: {
                    dir: __dirname + '/src/modules/mail/templates',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: false,
                    },
                },
            }),
        }),
    ],
    controllers: [],
    providers: [SendMailService],
    exports: [SendMailService],
})
export class MailModule {}
