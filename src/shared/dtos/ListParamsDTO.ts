import { Prisma } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ListParamsDTO {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Prisma.SortOrder, {
        message: `order must be a valid enum value. Valid options are: '${Prisma.SortOrder.asc}' | '${Prisma.SortOrder.desc}'`,
    })
    @ApiPropertyOptional({ enum: Prisma.SortOrder })
    public order?: Prisma.SortOrder = Prisma.SortOrder.asc;

    @ApiPropertyOptional({
        minimum: 1,
    })
    public page?: number = 1;

    @ApiPropertyOptional()
    public perPage?: number = 10;

    @ApiPropertyOptional()
    public search?: string;
}
