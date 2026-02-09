import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersRepository } from 'src/users/users.repository';
import { SKIP_PHONE_NUMBER_CHECK } from 'src/decorators/skip-phone-number-check.decorator';

@Injectable()
export class PhoneNumberInterceptor implements NestInterceptor {
  constructor(
    private usersRepository: UsersRepository,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // Check if this route should skip phone number check
    const skipPhoneCheck = this.reflector.get<boolean>(
      SKIP_PHONE_NUMBER_CHECK,
      context.getHandler(),
    );

    if (skipPhoneCheck) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Only check if user is authenticated
    if (user && user.id) {
      try {
        const fetchedUser = await this.usersRepository.findById(user.id);

        if (!fetchedUser) {
          throw new BadRequestException('User not found');
        }

        // Check if phone number exists
        if (!fetchedUser.phone || fetchedUser.phone.trim() === '') {
          throw new BadRequestException(
            'Phone number is required. Please update your profile with a valid phone number.',
          );
        }

        // Attach the fetched user to the request for further use
        request.user = fetchedUser;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new BadRequestException('User not found');
        }
        throw error;
      }
    }

    return next.handle();
  }
}
