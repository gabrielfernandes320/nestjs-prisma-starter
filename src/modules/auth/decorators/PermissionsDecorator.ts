import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: Array<string>) =>
    SetMetadata(PERMISSIONS_KEY, permissions);
