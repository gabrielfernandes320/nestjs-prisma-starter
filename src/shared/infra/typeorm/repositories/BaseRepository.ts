import { Injectable, Type, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import IBaseRepository, {
    Options,
} from '../../../repositories/IBaseRepository';
import EntityNotFoundException from '../../../exceptions/EntityNotFoundException';

type Constructor<I> = new (...args: any[]) => I;

export function BaseRepository<T>(
    entity: Constructor<T>,
): Type<IBaseRepository<T>> {
    @Injectable()
    class BaseRepositoryHost implements IBaseRepository<T> {
        @InjectRepository(entity) public repository: Repository<T>;

        public async findAll<R>(
            params: R,
            options?: Options<T>,
        ): Promise<{ value: T[]; total: number; pages: number }> {
            const { page, perPage }: any = params;
            const [result, total] = await this.repository.findAndCount({
                take: perPage,
                skip: perPage * (page - 1),
                relations: options?.relations,
            });

            return {
                value: result,
                total: total,
                pages: Math.round(total / perPage),
            };
        }

        public async findById(id: number, options?: Options<T>): Promise<T> {
            const entity = await this.repository.findOne(id, {
                relations: options?.relations,
            });

            if (entity) {
                return entity;
            }

            throw new EntityNotFoundException(id);
        }

        public async remove(id: number, options?: Options<T>): Promise<void> {
            try {
                const deleted = await this.repository.softDelete(id);

                if (!deleted.affected) {
                    throw new EntityNotFoundException(id);
                }
            } catch (error) {
                throw new HttpException(
                    {
                        message: 'Error at removing entity of the database',
                        error: { code: error?.code, detail: error?.detail },
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        public async create(entity: T, options?: Options<T>): Promise<T> {
            try {
                return await this.repository.save(entity);
            } catch (error) {
                throw new HttpException(
                    {
                        message: 'Error at inserting entity in database',
                        error: { code: error?.code, detail: error?.detail },
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        public async update(
            id: number,
            entity: T,
            options?: Options<T>,
        ): Promise<T> {
            const foundEntity = await this.repository.findOne(id);

            if (!foundEntity) {
                throw new EntityNotFoundException(id);
            }

            try {
                const updatedEntity = await this.repository.save(entity);

                if (updatedEntity) {
                    return updatedEntity;
                }
            } catch (error) {
                throw new HttpException(
                    {
                        message: 'Error at updating entity in database',
                        error: { code: error?.code, detail: error?.detail },
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    return BaseRepositoryHost;
}
