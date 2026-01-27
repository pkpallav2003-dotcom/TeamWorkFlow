import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './database/mongo.config';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoModule,
    UsersModule,
    TeamsModule,
    TeamMembersModule,
    AuthModule,
  ],
})
export class AppModule {}
