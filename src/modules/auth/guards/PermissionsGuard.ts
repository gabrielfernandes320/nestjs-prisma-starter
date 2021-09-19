import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import userHasPermissions from '../../../shared/utils/userHasPermission';

export const PERMISSIONS_KEY = 'permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
    public constructor(private reflector: Reflector) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<any[]>(
            PERMISSIONS_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredPermissions) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return userHasPermissions(user, requiredPermissions);
    }
}
