import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { AuthLiteGuard } from 'src/auth/auth-lite.guard';
import { AddTeamMemberDto } from './dto/add-team-member.dto';
import { LeadOnlyGuard } from './guards/lead-only.guard';

@UseGuards(AuthLiteGuard)
@Controller('team-members')
export class TeamMembersController {

    constructor(private readonly teamMemberService: TeamMembersService) { }

    @Post(':teamId')
    @UseGuards(AuthLiteGuard,LeadOnlyGuard)
    async addMember(
        @Param('teamId') teamId: string,
        @Body() dto: AddTeamMemberDto,
        @Req() req: Request & { userId: string },
    ) {
        return this.teamMemberService.addMember({
            teamId,
            addedByUserId: req.userId,   // who is adding
            targetUserId: dto.targetUserId, // who is being added
            role: dto.role,
        });
    }

    @Get()
    async getAll() {
        return this.teamMemberService.getAllMember();
    }

    @Delete(':teamId/:userId')
    @UseGuards(LeadOnlyGuard)
    async removeMember(
        @Param('teamId') teamId: string,
        @Param('userId') userId: string,
    ) {
        return this.teamMemberService.removeMember(teamId, userId);
    }


    @Get(':teamId/members')
    async getTeamMembers(@Param('teamId') teamId: string) {
        return this.teamMemberService.getMembersByTeamId(teamId);
    }


}


