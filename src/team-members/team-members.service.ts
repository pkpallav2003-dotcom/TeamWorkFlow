import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember } from 'src/schemas/team-member.schema';
import { validate as isUUID } from 'uuid';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectModel(TeamMember.name)
    private readonly teamMemberModel: Model<TeamMember>,
  ) { }


  // team-members.service.ts
  async addMember(params: {
    teamId: string;
    addedByUserId: string;
    targetUserId: string;
    role: 'MEMBER' | 'LEAD';
  }) {
    const { teamId, addedByUserId, targetUserId, role } = params;

    if (!isUUID(teamId) || !isUUID(targetUserId)) {
      throw new BadRequestException('Invalid IDs');
    }

    const existing = await this.teamMemberModel.findOne({
      teamId,
      userId: targetUserId,
    });

    if (existing) {
      throw new BadRequestException('User already a member of this team');
    }

    return this.teamMemberModel.create({
      teamId,
      userId: targetUserId,
      role,
    });
  }

  async getAllMember(): Promise<TeamMember[]> {
    return await this.teamMemberModel.find().exec();
  }

  async removeMember(teamId: string, userId: string) {
    if (!isUUID(teamId) || !isUUID(userId)) {
      throw new BadRequestException('Invalid IDs');
    }

    const result = await this.teamMemberModel.findOneAndDelete({
      teamId,
      userId,
    });

    if (!result) {
      throw new NotFoundException('Team member not found');
    }

    return { message: 'Member removed successfully' };
  }


  async getMembersByTeamId(teamId: string) {
    if (!isUUID(teamId)) {
      throw new BadRequestException('Invalid team ID');
    }

    return this.teamMemberModel.find({ teamId }).exec();
  }


}