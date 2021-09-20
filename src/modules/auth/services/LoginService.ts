import { Injectable } from '@nestjs/common';
import LoginDTO from '../dtos/LoginDTO';
import ValidateUserService from './ValidateUserService';
import GenerateCookieService from './GenerateCookieService';
import { CookieType } from '../enums/CookieTypeEnum';
import ShowUserByEmailService from '../../users/services/ShowUserByEmailService';
import { User } from '@prisma/client';

@Injectable()
export default class LoginService {
    public constructor(
        private validateUserService: ValidateUserService,
        private showUserByEmailService: ShowUserByEmailService,
        private generateCookieService: GenerateCookieService,
    ) {}

    public async execute(
        loginDto: LoginDTO,
    ): Promise<{ user: User; cookie: string; cookieRefreshToken: string }> {
        const user = await this.showUserByEmailService.execute(loginDto.login);

        if (user) {
            if (await this.validateUserService.execute(loginDto)) {
                const authCookie = await this.generateCookieService.execute(
                    CookieType.Authentication,
                    user.id,
                );
                const refreshTokenCookie =
                    await this.generateCookieService.execute(
                        CookieType.Refresh,
                        user.id,
                    );

                return {
                    user: user,
                    cookie: authCookie,
                    cookieRefreshToken: refreshTokenCookie,
                };
            }
        }

        throw new Error();
    }
}
