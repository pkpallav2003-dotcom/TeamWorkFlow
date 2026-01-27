import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from "uuid";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Team extends Document {

    @Prop({ default: uuidv4, unique: true })
    id: string

    @Prop({ required: true })
    name: string;

}

export const TeamSchema = SchemaFactory.createForClass(Team);