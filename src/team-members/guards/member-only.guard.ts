import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember } from 'src/schemas/team-member.schema';

@Injectable()
export class MemberOnlyGuard implements CanActivate {
  constructor(
    @InjectModel(TeamMember.name)
    private readonly teamMemberModel: Model<TeamMember>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.userId; // set by AuthLiteGuard
    const teamId =
      request.params.teamId ||
      request.params.id ||
      request.body.teamId;

    if (!teamId) {
      throw new ForbiddenException('Team ID is required');
    }

    const membership = await this.teamMemberModel.findOne({
      teamId,
      userId,
    });

    if (!membership) {
      throw new ForbiddenException(
        'You are not a member of this team',
      );
    }

    return true;
  }
}
