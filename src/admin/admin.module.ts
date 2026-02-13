import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';
import { RolesModule } from 'src/roles/roles.module';
import { AdminUsersController } from './users/admin-users.controller';
import { AdminEventsController } from './events/admin-events.controller';
import { AdminRolesController } from './roles/admin-roles.controller';

@Module({
  imports: [UsersModule, EventsModule, RolesModule],
  controllers: [
    AdminUsersController,
    AdminEventsController,
    AdminRolesController,
  ],
})
export class AdminModule {}
