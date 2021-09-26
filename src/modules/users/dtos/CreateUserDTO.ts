import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'youremail@email.com' })
    public email: string;

    @IsNotEmpty()
    @ApiProperty({ example: [{ id: 1 }] })
    public roles: [{ id: number }];

    @IsNotEmpty()
    @ApiProperty()
    public password: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    public enabled: boolean;
}
