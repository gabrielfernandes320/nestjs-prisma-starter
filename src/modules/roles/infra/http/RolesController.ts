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
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import CreateRoleDTO from '../../dtos/CreateRoleDTO';
import ListRoleDTO from '../../dtos/ListRoleDTO';
import UpdateRoleDTO from '../../dtos/UpdateRoleDTO';
import CreateRoleService from '../../services/CreateRoleService';
import DeleteRoleService from '../../services/DeleteRoleService';
import ListRoleService from '../../services/ListRoleService';
import ShowRoleService from '../../services/ShowRoleService';
import UpdateRoleService from '../../services/UpdateRoleService';

@UseGuards(JwtAuthenticationGuard)
@ApiTags('Roles')
@Controller({
    version: '1',
    path: 'roles',
})
export class RolesController {
    public constructor(
        private createRoleService: CreateRoleService,
        private deleteRoleService: DeleteRoleService,
        private listRoleService: ListRoleService,
        private showRoleService: ShowRoleService,
        private updateRoleService: UpdateRoleService,
    ) {}

    @Post()
    public async create(@Body() createRoleDto: CreateRoleDTO) {
        return await this.createRoleService.execute(createRoleDto);
    }

    @Get()
    public async findAll(@Query() query: ListRoleDTO) {
        return await this.listRoleService.execute(query);
    }

    @Get(':id')
    public async findOne(@Param('id') id: number) {
        return await this.showRoleService.execute(id);
    }

    @Patch(':id')
    public async update(
        @Param('id') id: number,
        @Body() updateRoleDto: UpdateRoleDTO,
    ) {
        return await this.updateRoleService.execute(id, updateRoleDto);
    }

    @Delete(':id')
    public async remove(@Param('id') id: number) {
        return await this.deleteRoleService.execute(id);
    }
}
