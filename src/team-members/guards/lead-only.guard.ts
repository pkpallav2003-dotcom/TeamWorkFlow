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
export class LeadOnlyGuard implements CanActivate {
    constructor(
        @InjectModel(TeamMember.name)
        private readonly teamMemberModel: Model<TeamMember>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const userId = request.userId; // set by AuthLiteGuard
        const teamId =
            request.params.teamId || request.params.id;

        if (!teamId) {
            throw new ForbiddenException('Team ID is required');
        }

        const membership = await this.teamMemberModel.findOne({
            teamId,
            userId,
            role: 'LEAD',
        });

        if (!membership) {
            throw new ForbiddenException('Only LEAD can perform this action');
        }

        return true;
    }
}
