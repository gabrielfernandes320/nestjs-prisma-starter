import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass, TransformClassToPlain } from 'class-transformer';
import { Permissions } from '../../../auth/decorators/PermissionsDecorator';
import { UserPermissions } from '../../../auth/enums/permissions';
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import { PermissionsGuard } from '../../../auth/guards/PermissionsGuard';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import ListUserDTO from '../../dtos/ListUserDTO';
import UpdateUserDTO from '../../dtos/UpdateUserDTO';
import CreateUserService from '../../services/CreateUserService';
import DeleteUserService from '../../services/DeleteUserService';
import ListUserService from '../../services/ListUserService';
import ShowUserService from '../../services/ShowUserService';
import UpdateUserService from '../../services/UpdateUserService';

@UseGuards(JwtAuthenticationGuard)
@ApiTags('Users')
@Controller({
    version: '1',
    path: 'users',
})
export class UsersController {
    public constructor(
        private createUserService: CreateUserService,
        private deleteUserService: DeleteUserService,
        private listUserService: ListUserService,
        private showUserService: ShowUserService,
        private updateUserService: UpdateUserService,
    ) {}

    @Permissions(UserPermissions.Create)
    @UseGuards(PermissionsGuard)
    @Post()
    public async create(@Body() createUserDto: CreateUserDTO) {
        return await this.createUserService.execute(createUserDto);
    }

    @Permissions(UserPermissions.List)
    @UseGuards(PermissionsGuard)
    @Get()
    public async findAll(@Query() query: ListUserDTO) {
        return await this.listUserService.execute(query);
    }

    @Permissions(UserPermissions.Show)
    @UseGuards(PermissionsGuard)
    @Get(':id')
    @TransformClassToPlain()
    public async findOne(@Param('id') id: number) {
        return await this.showUserService.execute(id);
    }

    @Permissions(UserPermissions.Update)
    @UseGuards(PermissionsGuard)
    @Patch(':id')
    public async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDTO,
    ) {
        return await this.updateUserService.execute(id, updateUserDto);
    }

    @Permissions(UserPermissions.Delete)
    @UseGuards(PermissionsGuard)
    @Delete(':id')
    public async remove(@Param('id') id: number) {
        return await this.deleteUserService.execute(id);
    }
}
