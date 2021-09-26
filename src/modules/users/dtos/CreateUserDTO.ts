import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
} from 'class-validator';

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
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    @ApiProperty()
    public password: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    public enabled: boolean;
}
