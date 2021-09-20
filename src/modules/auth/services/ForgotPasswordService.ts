import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import SendMailService from '../../mail/services/SendMailService';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import ForgotPasswordDTO from '../dtos/ForgotPasswordDTO';
import InvalidEmailException from '../exceptions/InvalidEmailException';
import { Template } from '../../mail/enums/TemplatesEnum';
import AppConfigService from '../../config/services/AppConfigService';
import { User } from '@prisma/client';

@Injectable()
export default class FogotPasswordService {
    public constructor(
        private configService: ConfigService,
        @Inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private jwtService: JwtService,
        private appConfigService: AppConfigService,
        private sendMailService: SendMailService,
    ) {}

    public async execute(forgotPasswordDto: ForgotPasswordDTO): Promise<User> {
        const user: any = await this.usersRepository.findByEmail(
            forgotPasswordDto.email,
        );

        if (!user) {
            throw new InvalidEmailException(forgotPasswordDto.email);
        }

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
        };
        const token = this.jwtService.sign(userData);

        const forgotLink = `${this.appConfigService.appUrl}/auth/change-password/${token}`;

        await this.sendMailService.execute({
            to: user.email,
            subject: 'Verify User',
            template: Template.AccountRecovery,
            html: `<a>${forgotLink} </a>`,
            // context: {
            //     Name: user.name,
            //     Url: forgotLink,
            // },
        } as ISendMailOptions);

        return user;
    }
}
