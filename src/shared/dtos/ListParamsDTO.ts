import { Ordering } from '../enums/Ordering';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ListParamsDTO {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Ordering, {
        message: `order must be a valid enum value. Valid options are: '${Ordering.ASC}' | '${Ordering.DESC}'`,
    })
    @ApiPropertyOptional({ enum: Ordering })
    public order?: Ordering = Ordering.ASC;

    @ApiPropertyOptional({
        minimum: 1,
    })
    public page?: number = 1;

    @ApiPropertyOptional()
    public perPage?: number = 10;

    @ApiPropertyOptional()
    public search?: string;
}
