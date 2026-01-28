import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;
@Schema()
export class Task{
    @Prop({required:true})
    teamId: string

    @Prop({required:true})
    createdBy: string

    @Prop({required:true})
    taskName: string

    @Prop({required:true})
    taskDescription: string

    @Prop({enum: ["Low", "Medium", "High"], required:true})
    priority: string
    
    @Prop({type: String})
    dueDate?: string

    @Prop({type:String})
    assigneeId?: string

    @Prop({type:String})
    reviewerId?: string

    @Prop({enum:["To-Do", "In-Progress", "Review", "Done", "Re-Work"], default: "To-Do"})
    taskStatus: string

    @Prop({type: Boolean, default: false})
    isApproved?: boolean

}
export const TaskSchema=SchemaFactory.createForClass(Task);