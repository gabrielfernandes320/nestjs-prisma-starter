import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../roles/infra/typeorm/entities/RoleEntity';

export default class Roles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const repository = connection.getRepository(Role);

        const entity = await this.getRole();

        await repository.delete({});

        await repository.save(entity);
    }

    private async getRole() {
        return {
            name: 'Administrator',
            enabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Role;
    }
}
