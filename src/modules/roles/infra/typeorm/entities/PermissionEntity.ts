import { BaseEntity } from './../../../../../shared/infra/typeorm/entities/BaseEntity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public reference: string;

    @ApiProperty()
    @Column()
    public resource: string;

    @ApiProperty()
    @Column()
    public action: string;
}
