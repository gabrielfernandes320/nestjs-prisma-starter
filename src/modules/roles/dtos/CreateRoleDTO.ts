import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateRoleDTO {
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    public reference?: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    public enabled: boolean;

    @IsNotEmpty()
    public permissions: { id: number }[];
}
