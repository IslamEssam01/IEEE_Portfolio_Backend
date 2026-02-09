import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
  Query,
  Req,
  ParseUUIDPipe,
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
import { EventsService } from 'src/events/events.service';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { UpdateEventDto } from 'src/events/dto/update-event.dto';
import { UpdateRegistrationStatusDto } from 'src/events/dto/update-registration-status.dto';
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
import {
  create_event_swagger,
  update_event_swagger,
  delete_event_swagger,
  get_event_registrations_swagger,
  update_event_registration_status_swagger,
} from 'src/events/events.swagger';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@ApiTags('admin/events')
@Controller('admin/events')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AdminEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation(create_event_swagger.operation)
  @ApiCreatedResponse(create_event_swagger.responses.success)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiBadRequestErrorResponse(ERROR_MESSAGES.EVENT_INVALID_TIME_RANGE)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.EVENT_CREATED)
  create(
    @Body() createEventDto: CreateEventDto,
    @Req() req: Request & { user: User },
  ) {
    return this.eventsService.create(createEventDto, req.user);
  }

  @Patch(':id')
  @ApiOperation(update_event_swagger.operation)
  @ApiOkResponse(update_event_swagger.responses.success)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiBadRequestErrorResponse(ERROR_MESSAGES.EVENT_INVALID_TIME_RANGE)
  @ApiNotFoundErrorResponse(ERROR_MESSAGES.EVENT_NOT_FOUND)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.EVENT_UPDATED)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: Request & { user: User },
  ) {
    return this.eventsService.update(id, updateEventDto, req.user);
  }

  @Delete(':id')
  @ApiOperation(delete_event_swagger.operation)
  @ApiOkResponse(delete_event_swagger.responses.success)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiNotFoundErrorResponse(ERROR_MESSAGES.EVENT_NOT_FOUND)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.EVENT_DELETED)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request & { user: User },
  ) {
    return this.eventsService.remove(id, req.user);
  }

  @Get(':id/registrations')
  @ApiOperation(get_event_registrations_swagger.operation)
  @ApiOkResponse(get_event_registrations_swagger.responses.success)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiNotFoundErrorResponse(ERROR_MESSAGES.EVENT_NOT_FOUND)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  getEventRegistrations(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request & { user: User },
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.eventsService.getEventRegistrations(
      id,
      req.user,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Patch(':id/registrations/:registrationId/status')
  @ApiOperation(update_event_registration_status_swagger.operation)
  @ApiOkResponse(update_event_registration_status_swagger.responses.success)
  @ApiUnauthorizedErrorResponse(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN)
  @ApiForbiddenErrorResponse(ERROR_MESSAGES.FORBIDDEN_ACTION)
  @ApiBadRequestErrorResponse(ERROR_MESSAGES.EVENT_FULL)
  @ApiNotFoundErrorResponse(ERROR_MESSAGES.EVENT_REGISTRATION_NOT_FOUND)
  @ApiInternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  @ResponseMessage(SUCCESS_MESSAGES.EVENT_REGISTRATION_STATUS_UPDATED)
  updateRegistrationStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('registrationId', ParseUUIDPipe) registrationId: string,
    @Body() updateStatusDto: UpdateRegistrationStatusDto,
    @Req() req: Request & { user: User },
  ) {
    return this.eventsService.updateRegistrationStatus(
      id,
      registrationId,
      updateStatusDto.status,
      req.user,
    );
  }
}
