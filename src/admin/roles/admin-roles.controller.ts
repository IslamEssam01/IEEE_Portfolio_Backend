import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { RolesService } from 'src/roles/roles.service';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { UpdateRoleDto } from 'src/roles/dto/update-role.dto';
import { User } from 'src/users/entities/user.entity';
import {
  ApiBadRequestErrorResponse,
  ApiConflictErrorResponse,
  ApiInternalServerError,
  ApiNotFoundErrorResponse,
  ApiUnauthorizedErrorResponse,
  ApiForbiddenErrorResponse,
} from 'src/decorators/swagger-error-responses.decorator';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from 'src/constants/swagger-messages';
import {
  create_role_swagger,
  update_role_swagger,
  delete_role_swagger,
} from 'src/roles/roles.swagger';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller('admin/roles')
@ApiTags('admin/roles')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AdminRolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation(create_role_swagger.operation)
  @ApiCreatedResponse(create_role_swagger.responses.success)
  @ApiBadRequestErrorResponse(ERROR_MESSAGES.ROLE_ALREADY_EXISTS)
  @ApiConflictErrorResponse(ERROR_MESSAGES.ROLE_ALREADY_EXISTS)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.ROLE_CREATED)
  create(
    @Body() createRoleDto: CreateRoleDto,
    @Req() req: Request & { user: User },
  ) {
    return this.rolesService.create(createRoleDto, req.user);
  }

  @Patch(':id')
  @ApiOperation(update_role_swagger.operation)
  @ApiOkResponse(update_role_swagger.responses.success)
  @ApiBadRequestErrorResponse(ERROR_MESSAGES.ROLE_ALREADY_EXISTS)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiNotFoundErrorResponse(ERROR_MESSAGES.ROLE_NOT_FOUND)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.ROLE_UPDATED)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Req() req: Request & { user: User },
  ) {
    return this.rolesService.update(id, updateRoleDto, req.user);
  }

  @Delete(':id')
  @ApiOperation(delete_role_swagger.operation)
  @ApiOkResponse(delete_role_swagger.responses.success)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiNotFoundErrorResponse(ERROR_MESSAGES.ROLE_NOT_FOUND)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.ROLE_DELETED)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request & { user: User },
  ) {
    return this.rolesService.remove(id, req.user);
  }
}
