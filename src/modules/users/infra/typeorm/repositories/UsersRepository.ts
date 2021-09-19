import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import { ILike, Repository } from 'typeorm';
import { User } from '../entities/UserEntity';
import { BaseRepository } from '../../../../../shared/infra/typeorm/repositories/BaseRepository';
import ListUserDTO from '../../../dtos/ListUserDTO';

@Injectable()
export class UsersRepository
    extends BaseRepository(User)
    implements IUsersRepository
{
    public constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
        super();
    }

    public async findAll(params: ListUserDTO): Promise<any> {
        const { page, perPage, search, order } = params;

        const [result, total] = await this.usersRepository.findAndCount({
            where: { name: ILike(`%${search ?? ''}%`) },
            order: { id: order },
            take: perPage,
            skip: perPage * (page - 1),
            relations: ['roles'],
        });

        return {
            value: result,
            total: total,
            pages: Math.round(total / perPage),
        };
    }

    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: { email },
            relations: ['roles', 'roles.permissions'],
        });
    }
}
