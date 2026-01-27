import { CreateNewTaskDto } from "./tasks.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateTasksDto extends PartialType(CreateNewTaskDto){
    
}
