import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    example: 'Lion',
    description: 'Name of the user',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address',
    format: 'email',
  })
  readonly email: string;
}
