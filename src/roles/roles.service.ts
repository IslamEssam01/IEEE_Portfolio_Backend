import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  // --- FIND ALL ---
  async findAll() {
    return this.rolesRepository.find();
  }

  async findOne(id: string) {
    const role = await this.rolesRepository.findOne({
      where: { id },
      // relations: ['users'], // Uncomment if you want to see all users with this role
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async findByName(name: string) {
    const role = await this.rolesRepository.findOne({ where: { name } });

    if (!role) {
      throw new NotFoundException(`Role '${name}' not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.preload({
      id: id,
      ...updateRoleDto,
    });

    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }

    return this.rolesRepository.save(role);
  }

  async remove(id: string) {
    const result = await this.rolesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Role #${id} not found`);
    }

    return { message: 'Role deleted successfully' };
  }
}
