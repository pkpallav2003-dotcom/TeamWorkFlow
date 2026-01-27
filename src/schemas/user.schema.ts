import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from "uuid";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class User extends Document {

    @Prop({default: uuidv4, unique:true})
    id : string

    @Prop ({required: true})
    name: string;

    @Prop ({required: true, unique: true})
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);