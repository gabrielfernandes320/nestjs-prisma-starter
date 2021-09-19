import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';

export const providers = [
    { provide: 'UsersRepository', useClass: UsersRepository },
];

export default providers;
