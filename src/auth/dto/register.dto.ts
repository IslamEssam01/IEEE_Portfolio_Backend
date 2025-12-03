import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STRING_MAX_LENGTH } from 'src/constants/variables';

export class RegisterDTO {
  @ApiProperty({ description: 'User email', example: 'wagih123@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(STRING_MAX_LENGTH)
  email: string;

  @ApiProperty({ description: 'Username', example: 'AhmedWaGiiH' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(STRING_MAX_LENGTH)
  username: string;

  @ApiProperty({
    description: 'Password',
    minLength: 8,
    example: 'StrongPassw0rd!',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(STRING_MAX_LENGTH)
  password: string;

  @ApiProperty({
    description: 'Confirm password',
    minLength: 8,
    example: 'StrongPassw0rd!',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(STRING_MAX_LENGTH)
  confirmPassword: string;
}
