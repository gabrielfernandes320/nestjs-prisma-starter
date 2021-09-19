import IBaseRepository from '../../../shared/repositories/IBaseRepository';
import ListPermissionsDTO from '../dtos/ListPermissionDTO';
import { Permission } from '../infra/typeorm/entities/PermissionEntity';

export default interface IPermissionsRepository
    extends IBaseRepository<Permission> {
    findAll(params: ListPermissionsDTO): Promise<any>;
}
