import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  create_user_swagger,
  get_all_users_swagger,
  get_user_by_id_swagger,
  update_user_swagger,
  delete_user_swagger,
} from './users.swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation(create_user_swagger.operation)
  @ApiOkResponse(create_user_swagger.responses.success)
  @ApiBadRequestResponse(create_user_swagger.responses.badRequest)
  @ApiConflictResponse(create_user_swagger.responses.conflict)
  @ApiInternalServerErrorResponse(
    create_user_swagger.responses.internalServerError,
  )
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation(get_all_users_swagger.operation)
  @ApiOkResponse(get_all_users_swagger.responses.success)
  @ApiInternalServerErrorResponse(
    get_all_users_swagger.responses.internalServerError,
  )
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation(get_user_by_id_swagger.operation)
  @ApiOkResponse(get_user_by_id_swagger.responses.success)
  @ApiNotFoundResponse(get_user_by_id_swagger.responses.notFound)
  @ApiInternalServerErrorResponse(
    get_user_by_id_swagger.responses.internalServerError,
  )
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation(update_user_swagger.operation)
  @ApiOkResponse(update_user_swagger.responses.success)
  @ApiBadRequestResponse(update_user_swagger.responses.badRequest)
  @ApiNotFoundResponse(update_user_swagger.responses.notFound)
  @ApiInternalServerErrorResponse(
    update_user_swagger.responses.internalServerError,
  )
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation(delete_user_swagger.operation)
  @ApiOkResponse(delete_user_swagger.responses.success)
  @ApiNotFoundResponse(delete_user_swagger.responses.notFound)
  @ApiInternalServerErrorResponse(
    delete_user_swagger.responses.internalServerError,
  )
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
