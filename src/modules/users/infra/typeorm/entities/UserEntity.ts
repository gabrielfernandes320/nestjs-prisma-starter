import { BaseEntity } from './../../../../../shared/infra/typeorm/entities/BaseEntity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import hashPassword from '../../../../../shared/utils/hashPassword';
import { Role } from '../../../../roles/infra/typeorm/entities/RoleEntity';

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    @Index({ unique: true })
    public email: string;

    @ApiProperty()
    @Exclude({ toPlainOnly: true })
    @Column()
    public password: string;

    @ApiProperty()
    @Column()
    public enabled: boolean;

    @ApiProperty()
    @ManyToMany(() => Role, (role) => role.name)
    @JoinTable({
        name: 'user_roles',
        joinColumns: [{ name: 'user_id' }],
        inverseJoinColumns: [{ name: 'role_id' }],
    })
    public roles: Role[];

    @BeforeUpdate()
    @BeforeInsert()
    public async setUpdatedAt() {
        if (this.password) {
            this.password = await hashPassword(this.password);
        }

        this.updatedAt = new Date();
    }
}
