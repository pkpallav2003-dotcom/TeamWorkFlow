import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional({
    example: 'Backend Interns Updated',
    description: 'Updated team name',
  })
  name?: string;
}
