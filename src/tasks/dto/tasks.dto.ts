import { IsEnum, IsString, IsOptional, IsMongoId, IsDateString } from "class-validator";

export class CreateNewTaskDto{
    @IsString()
    teamId: string;

    @IsString()
    taskName: string;

    @IsString()
    taskDescription:string;

    @IsEnum(["Low", "Medium", "High"],{
        message:"Valid Priority Required."
    })
    priority: "Low" | "Medium" | "High";
    
    @IsOptional()
    @IsDateString()
    dueDate ?: string;
    

    @IsOptional()
    @IsMongoId()
    assigneeId?: string;

    @IsOptional()
    @IsMongoId()
    reviewerId?: string;


    @IsEnum(["To-Do", "In-Progress", "Review", "Done", "Re-Work"],{
        message:"Valid Status Required."
    })
    @IsOptional()
    taskStatus ?: "To-Do" | "In-Progress" | "Review" | "Done" | "Re-Work";
}