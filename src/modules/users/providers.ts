//import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { UsersRepository } from './infra/prisma/repositories/UsersRepository';

export const providers = [
    { provide: 'UsersRepository', useClass: UsersRepository },
];

export default providers;
