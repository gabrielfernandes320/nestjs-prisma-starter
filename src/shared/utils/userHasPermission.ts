import { flatten } from '@nestjs/common';
import { removeDuplicates } from './array';
import { Permission, User, Role } from '@prisma/client';

export default function userHasPermission(
    user: any,
    requiredPermissions: string[],
) {
    if (user !== undefined) {
        const permissions: Permission[] = removeDuplicates(
            flatten(user?.roles.map((role: any) => role?.permissions)) as any[],
        );

        return permissions.some((permission) =>
            requiredPermissions.includes(permission.reference),
        );
    }

    return false;
}
