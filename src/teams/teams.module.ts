import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from 'src/schemas/team.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TeamMember, TeamMemberSchema } from 'src/schemas/team-member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Team.name,
      schema: TeamSchema,
    },
    {
      name: TeamMember.name,
      schema: TeamMemberSchema
    }
  ]),
    AuthModule,
    UsersModule
  ],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
