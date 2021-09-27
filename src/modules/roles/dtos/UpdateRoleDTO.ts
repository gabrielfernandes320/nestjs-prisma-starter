import { IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateRoleDTO {
    @IsNotEmpty()
    public id: string | number;

    @IsNotEmpty()
    public name: string;

    @IsOptional()
    public reference: string;

    @IsNotEmpty()
    public permissions: Array<{ id: number }>;
}
