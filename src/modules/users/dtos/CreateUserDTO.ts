import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDTO {
    @IsNotEmpty()
    @ApiProperty()
    public name: string | number;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'youremail@email.com' })
    public email: string;

    @IsNotEmpty()
    @ApiProperty({ example: [{ id: 1 }] })
    public roles: { id: string }[];

    @IsNotEmpty()
    @ApiProperty()
    public password: string;

    @IsNotEmpty()
    @ApiProperty()
    public enabled: boolean;
}
