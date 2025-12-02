import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: { id: (await this.rolesService.findByName(createUserDto.role)).id },
    });

    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find({ relations: ['role'] });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return { message: 'User deleted successfully' };
  }
}
