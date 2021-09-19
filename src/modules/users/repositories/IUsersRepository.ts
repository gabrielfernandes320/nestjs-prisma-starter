import IBaseRepository from '../../../shared/repositories/IBaseRepository';
import { User } from '../infra/typeorm/entities/UserEntity';

export default interface IUsersRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User>;
}
