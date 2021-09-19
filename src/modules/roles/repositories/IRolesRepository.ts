import { Role } from '../infra/typeorm/entities/RoleEntity';
import IBaseRepository from '../../../shared/repositories/IBaseRepository';

export default interface IRolesRepository extends IBaseRepository<Role> {}
