import { IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateRoleDTO {
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    public reference: string;

    @IsNotEmpty()
    public permissions: { id: string | number }[];
}
