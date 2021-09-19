import { BaseEntity } from './../../../../../shared/infra/typeorm/entities/BaseEntity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Permission } from './PermissionEntity';

@Entity('roles')
export class Role extends BaseEntity {
    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public reference: string;

    @ApiProperty()
    @ManyToMany(() => Permission, (permission) => permission.name)
    @JoinTable({
        name: 'roles_permissions',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }],
    })
    public permissions: Permission[];

    @ApiProperty()
    @Column()
    public enabled: boolean;
}
