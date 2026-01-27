import { Module } from '@nestjs/common';
import { TeamMembersController } from './team-members.controller';
import { TeamMembersService } from './team-members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from 'src/schemas/team-member.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { LeadOnlyGuard } from './guards/lead-only.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: TeamMember.name,
      schema: TeamMemberSchema,
    }]),
    AuthModule,
    UsersModule
  ],
  controllers: [TeamMembersController],
  providers: [TeamMembersService, LeadOnlyGuard]
})
export class TeamMembersModule {}
