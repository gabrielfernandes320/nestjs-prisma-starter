import ListPermissionDTO from '../dtos/ListPermissionDTO';
export default interface IPermissionsRepository {
    findAll(params: ListPermissionDTO): Promise<any>;
}
