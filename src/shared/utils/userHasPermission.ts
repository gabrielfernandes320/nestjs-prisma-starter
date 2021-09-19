import { Role } from 'src/modules/roles/infra/typeorm/entities/RoleEntity';
import { Permission } from 'src/modules/roles/infra/typeorm/entities/PermissionEntity';
import { User } from '../../modules/users/infra/typeorm/entities/UserEntity';
import { flatten } from '@nestjs/common';
import { removeDuplicates } from './array';

export default function userHasPermission(
    user: User,
    requiredPermissions: string[],
) {
    if (user !== undefined) {
        const permissions: Permission[] = removeDuplicates(
            flatten(user?.roles.map((role) => role?.permissions)),
        );

        return permissions.some((permission) =>
            requiredPermissions.includes(permission.reference),
        );
    }

    return false;
}
