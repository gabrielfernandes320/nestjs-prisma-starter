import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class ChangePasswordDTO {
    @IsNotEmpty()
    @ApiProperty()
    public password: string;

    @IsNotEmpty()
    @ApiProperty()
    public passwordConfirmation: string;

    @IsNotEmpty()
    @ApiProperty()
    public token: string;
}
