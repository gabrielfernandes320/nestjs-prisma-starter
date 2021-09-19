import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class ForgotPasswordDTO {
    @IsNotEmpty()
    @ApiProperty()
    public email: string;
}
