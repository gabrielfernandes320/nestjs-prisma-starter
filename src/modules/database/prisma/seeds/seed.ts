import PermissionSeeder from './PermissionSeeder';
import RoleSeeder from './RolesSeeder';
import UserSeeder from './UsersSeeder';

async function main() {
    await PermissionSeeder.run();
    await RoleSeeder.run();
    await UserSeeder.run();
}

main();
