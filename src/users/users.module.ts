import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
