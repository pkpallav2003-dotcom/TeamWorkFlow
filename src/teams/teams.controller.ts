import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { AuthLiteGuard } from 'src/auth/auth-lite.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@UseGuards(AuthLiteGuard)
@Controller('teams')
export class TeamsController {

    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    async createTeam(
        @Body() dto : CreateTeamDto,
        @Req() req: Request & { userId: string },
        ) {
        return this.teamsService.createTeam(dto.name, req.userId);
    }

    @Get()
    async getAllTeams(){
        return this.teamsService.findAll();
    }

    @Get(':id')
    async getTeamById(@Param('id') id: string) {    
        return this.teamsService.findById(id);
    }

    @Delete(':id')
    async deleteTeamById(@Param('id') id: string) {
        return this.teamsService.deleteById(id);
    }

    @Patch(':id')
    async updateTeam(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
        return this.teamsService.updateTeam(id,dto.name);
    }

}
