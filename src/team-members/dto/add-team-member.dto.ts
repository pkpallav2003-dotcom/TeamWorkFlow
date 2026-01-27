import { IsEnum, IsMongoId, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class AddTeamMemberDto {
  @IsUUID()
  targetUserId: string;


  @IsEnum(['MEMBER', 'LEAD'])
  @ApiProperty({
    enum: ['MEMBER', 'LEAD'],
    description: 'Role of the user in the team',
    example: 'MEMBER',
  })
  role: 'MEMBER' | 'LEAD';
}
