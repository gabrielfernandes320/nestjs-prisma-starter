import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, Repository } from 'typeorm';
import { Role } from '../../roles/infra/typeorm/entities/RoleEntity';
import { Permission } from '../../roles/infra/typeorm/entities/PermissionEntity';

export default class Roles implements Seeder {
    public constructor(
        private connection: Connection,
        private permissionsRepository: Repository<Permission>,
        private rolesRepository: Repository<Role>,
    ) {}

    public async run(factory: Factory, connection: Connection): Promise<any> {
        this.connection = connection;
        this.rolesRepository = this.connection.getRepository(Role);
        this.permissionsRepository = this.connection.getRepository(Permission);

        const entity = await this.getRole();

        await this.rolesRepository.delete({});

        await this.rolesRepository.save(entity);
    }

    private async getRole(): Promise<Partial<Role>> {
        return {
            name: 'Administrator',
            enabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            permissions: await this.permissionsRepository.find(),
        };
    }
}
