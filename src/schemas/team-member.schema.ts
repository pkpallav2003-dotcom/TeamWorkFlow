import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export enum Role {
    MEMBER = 'MEMBER',
    LEAD = 'LEAD',
}

@Schema({ timestamps: true })
export class TeamMember extends Document {

    @Prop({ default: uuidv4, unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    teamId: string;   // UUID

    @Prop({ required: true })
    userId: string;

    @Prop({ enum: Role, required: true, default: Role.MEMBER })
    role: Role;
}
export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);