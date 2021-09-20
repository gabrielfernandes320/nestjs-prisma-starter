import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export default class UpdateUserDTO {
    @IsNumber()
    @IsNotEmpty()
    public id: number;

    @IsNotEmpty() public name?: string;
    @IsNotEmpty() public email?: string;
    @IsOptional() public roles?: any;
    @IsNotEmpty() public enabled: boolean;
    @IsOptional() public password?: string;
    @IsOptional() public createdAt: Date;
    @IsOptional() public updatedAt?: Date;
    @IsOptional() public deletedAt?: Date;
}
