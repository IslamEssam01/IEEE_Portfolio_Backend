import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  create_role_swagger,
  get_all_roles_swagger,
  get_role_by_id_swagger,
  get_role_by_name_swagger,
  update_role_swagger,
  delete_role_swagger,
} from './roles.swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation(create_role_swagger.operation)
  @ApiOkResponse(create_role_swagger.responses.success)
  @ApiBadRequestResponse(create_role_swagger.responses.badRequest)
  @ApiConflictResponse(create_role_swagger.responses.conflict)
  @ApiInternalServerErrorResponse(
    create_role_swagger.responses.internalServerError,
  )
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation(get_all_roles_swagger.operation)
  @ApiOkResponse(get_all_roles_swagger.responses.success)
  @ApiInternalServerErrorResponse(
    get_all_roles_swagger.responses.internalServerError,
  )
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation(get_role_by_id_swagger.operation)
  @ApiOkResponse(get_role_by_id_swagger.responses.success)
  @ApiNotFoundResponse(get_role_by_id_swagger.responses.notFound)
  @ApiInternalServerErrorResponse(
    get_role_by_id_swagger.responses.internalServerError,
  )
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Get('name/:name')
  @ApiOperation(get_role_by_name_swagger.operation)
  @ApiOkResponse(get_role_by_name_swagger.responses.success)
  @ApiNotFoundResponse(get_role_by_name_swagger.responses.notFound)
  @ApiInternalServerErrorResponse(
    get_role_by_name_swagger.responses.internalServerError,
  )
  findByName(@Param('name') name: string) {
    return this.rolesService.findByName(name);
  }

  @Patch(':id')
  @ApiOperation(update_role_swagger.operation)
  @ApiOkResponse(update_role_swagger.responses.success)
  @ApiBadRequestResponse(update_role_swagger.responses.badRequest)
  @ApiNotFoundResponse(update_role_swagger.responses.notFound)
  @ApiInternalServerErrorResponse(
    update_role_swagger.responses.internalServerError,
  )
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation(delete_role_swagger.operation)
  @ApiOkResponse(delete_role_swagger.responses.success)
  @ApiNotFoundResponse(delete_role_swagger.responses.notFound)
  @ApiInternalServerErrorResponse(
    delete_role_swagger.responses.internalServerError,
  )
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
