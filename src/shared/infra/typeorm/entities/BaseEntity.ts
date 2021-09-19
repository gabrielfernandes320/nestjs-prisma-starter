import {
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    public deletedAt?: Date;

    @BeforeInsert()
    public setCreated() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    @BeforeInsert()
    public setUpdatedAt() {
        this.updatedAt = new Date();
    }
}
