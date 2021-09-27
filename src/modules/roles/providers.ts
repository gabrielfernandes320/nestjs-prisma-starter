import { PermissionsRepository } from './infra/prisma/repositories/PermissionsRepository';
import { RolesRepository } from './infra/prisma/repositories/RolesRepository';

export const providers = [
    { provide: 'RolesRepository', useClass: RolesRepository },
    { provide: 'PermissionsRepository', useClass: PermissionsRepository },
];

export default providers;
