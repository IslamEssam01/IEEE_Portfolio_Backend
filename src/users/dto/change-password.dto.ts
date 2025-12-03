import { IsString, MinLength, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STRING_MAX_LENGTH } from 'src/constants/variables';

export class ChangePasswordDto {
  @ApiProperty({ example: 'A@liCurr1entpass' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description:
      'User password - must contain at least one uppercase letter, one lowercase letter, and one number or special character, minimum length is 8 characters',
    example: 'A@lliSa_idd11',
    minLength: 8,
    maxLength: STRING_MAX_LENGTH,
    format: 'password',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(STRING_MAX_LENGTH)
  newPassword: string;
}
