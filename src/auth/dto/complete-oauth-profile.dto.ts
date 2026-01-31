import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class CompleteOAuthProfileDto {
  @IsNotEmpty()
  @IsString()
  faculty: string;

  @IsNotEmpty()
  @IsString()
  university: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(6)
  academic_year: number;

  @IsString()
  username?: string;

  @IsString()
  major?: string;
}
