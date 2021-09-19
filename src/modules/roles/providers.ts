import { PermissionsRepository } from './infra/typeorm/repositories/PermissionsRepository';
import { RolesRepository } from './infra/typeorm/repositories/RolesRepository';

export const providers = [
    { provide: 'RolesRepository', useClass: RolesRepository },
    { provide: 'PermissionsRepository', useClass: PermissionsRepository },
];

export default providers;
