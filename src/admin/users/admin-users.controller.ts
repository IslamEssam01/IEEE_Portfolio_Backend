import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import {
  ApiBadRequestErrorResponse,
  ApiConflictErrorResponse,
  ApiForbiddenErrorResponse,
  ApiInternalServerError,
  ApiNotFoundErrorResponse,
  ApiUnauthorizedErrorResponse,
} from 'src/decorators/swagger-error-responses.decorator';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from 'src/constants/swagger-messages';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { SkipPhoneNumberCheck } from 'src/decorators/skip-phone-number-check.decorator';
import {
  create_user_swagger,
  delete_user_swagger,
} from 'src/users/users.swagger';

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @SkipPhoneNumberCheck()
  // @ApiOperation(create_user_swagger.operation)
  // @ApiCreatedResponse(create_user_swagger.responses.success)
  // @ApiBadRequestErrorResponse(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS)
  // @ApiConflictErrorResponse(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS)
  // @ApiNotFoundErrorResponse(ERROR_MESSAGES.ROLE_NOT_FOUND)
  // @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  // @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  // @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  // @ResponseMessage(SUCCESS_MESSAGES.USER_REGISTERED)
  // async create(
  //   @Body() createUserDto: CreateUserDto,
  //   @Req() req: Request & { user: User },
  // ) {
  //   return await this.usersService.create(createUserDto, req.user);
  // }

  @Delete(':id')
  @ApiOperation(delete_user_swagger.operation)
  @ApiOkResponse(delete_user_swagger.responses.success)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiNotFoundErrorResponse(ERROR_MESSAGES.USER_NOT_FOUND)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.ACCOUNT_REMOVED)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request & { user: User },
  ) {
    return this.usersService.remove(id, req.user);
  }
}
