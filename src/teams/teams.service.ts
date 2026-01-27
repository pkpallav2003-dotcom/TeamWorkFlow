import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { TeamMember } from 'src/schemas/team-member.schema';
import { Team } from 'src/schemas/team.schema';
import { validate as isUUID } from 'uuid';

@Injectable()
export class TeamsService {

    constructor(
            @InjectModel(Team.name)
            private readonly teamModel: Model<Team>,
            @InjectModel(TeamMember.name)
            private readonly teamMemberModel: Model<TeamMember>,
        ){}
    
    async createTeam(name: string, creatorId: string): Promise<Team> {
        const createdTeam = await this.teamModel.create({name});

        await this.teamMemberModel.create({
        teamId: createdTeam.id,
        userId: creatorId,
        role: 'LEAD',
    });

        return createdTeam.save();
    }

    async findAll(): Promise<Team[]> {
        return await this.teamModel.find().exec();
    }

    async findById(id: string): Promise<Team> {

        if(!isUUID(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const team =  await this.teamModel.findOne({id}).exec();

        if(!team) {
            throw new Error('Team not found');
        }

        return team;
    }

    async deleteById(id: string): Promise<{message: string}> {
        if(!isUUID(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const result = await this.teamModel.findOneAndDelete({id}).exec();

        if(!result) {   
            throw new Error('Team not found');
        }
        return {message: 'Team deleted successfully'};
    }

    async updateTeam(id: string,name?: string) : Promise<{team: Team, message: String}>{
        if(!isUUID(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const team = await this.teamModel.findOne({id}).exec();

        if(!team){
            throw new NotFoundException('Team not found');
        }
        if(name){
            team.name= name
        }
        return {team: await team.save(), message: "Team Updated" };
    }
    
    
    
}

