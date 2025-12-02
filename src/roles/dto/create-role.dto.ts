import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STRING_MAX_LENGTH } from 'src/constants/variables';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'Admin',
    minLength: 2,
    maxLength: STRING_MAX_LENGTH,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(STRING_MAX_LENGTH)
  name: string;

  @ApiProperty({
    description: 'Description of the role and its permissions',
    example: 'Administrator with full system access',
    minLength: 5,
    maxLength: STRING_MAX_LENGTH,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(STRING_MAX_LENGTH)
  description: string;
}
