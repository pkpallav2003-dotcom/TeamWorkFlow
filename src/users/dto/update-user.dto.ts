import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional({
    example: 'Lion Updated',
    description: 'Updated name of the user',
  })
  name?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  @ApiPropertyOptional({
    example: 'updated@example.com',
    description: 'Updated email address',
    format: 'email',
  })
  email?: string;
}
