import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateNewTaskDto } from './dto/tasks.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './tasks.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

    // Flow Validation for Status : To-Do, In-Progress, Review, Done, Re-Work
    findStatusFlow(currentStatus:string, newStatus:string):
    boolean{
        const statusFlow={
            "To-Do": ["In-Progress"], 
            "In-Progress": ["Review"], 
            "Review": ["Done", "Re-Work"],
            "Re-Work": ["In-Progress"],
            "Done": []
        };

        if(!statusFlow[currentStatus] ){
            return false
        }

        return statusFlow[currentStatus].includes(newStatus)
    }


    // Get ALL Tasks
    async getAllTasks(teamId:string, status?: string, assigneeId?:string, priority?:string, dueBefore?:string, q?:string):
    Promise<Task[]>{
        const filter: any={teamId};
        if(status) filter.taskStatus=status;
        if(assigneeId) filter.assigneeId= assigneeId
        if(priority) filter.priority= priority
        if(dueBefore) filter.dueDate= {$lte: dueBefore}
        if(q) filter.taskName={$regex:q};
        return this.taskModel.find(filter).exec();
    }

    // Get Task by ID
    async getTaskById(id: string): Promise<Task | null>{
        const task = await this.taskModel.findById(id).exec();
        if (!task){
            throw new NotFoundException("Task not found");
        }
        return task;
    }

    // Create New Task
    async createTask(dto: CreateNewTaskDto):
    Promise<Task>{
        const newTask = new this.taskModel({ ...dto, taskStatus: "To-Do"});
        return newTask.save();
    }

    async updateTask(id:string, data: Partial<CreateNewTaskDto>):
    Promise<Task | null>{
        const task = await this.taskModel.findById(id).exec();
        if(!task) throw new NotFoundException("task not found");

        const allowedFields= ["taskName", "taskDescription", "priority", "dueDate", "assigneeId"];
        const updateData:any={}

        allowedFields.forEach(field=>{
            if(field in data){
                updateData[field]=data[field]
            }
        })
        return this.taskModel.findByIdAndUpdate(id, updateData,{new:true}).exec();
    }

    // async deleteTask(id:string):
    // Promise<Task | null>{
    //     return this.taskModel.findByIdAndDelete(id).exec();
    // }

    async assignTask(id:string, assigneeId:string):
    Promise<Task | null>{
        const task= await this.taskModel.findById(id).exec();
        if(!task) throw new NotFoundException("Task Not Found");
        return this.taskModel.findByIdAndUpdate(id, {assigneeId: assigneeId}, {new:true}).exec();
    }

    async unassignTask(id: string):
    Promise<Task | null>{
        const task= await this.taskModel.findById(id).exec();
        if (!task) throw new NotFoundException("Task not found");
        
        return this.taskModel.findByIdAndUpdate(id, {assigneeId: null}, {new:true}).exec();
    }

    async addTaskStatus(id:string,status:string):
    Promise<Task| null>{
        return this.taskModel.findByIdAndUpdate(id, {taskStatus: status}, {new:true}).exec();
    }

    // Update Task Status with flow validation
    async updateTaskStatus(id: string, newStatus: string): Promise<Task | null>{
        const task = await this.taskModel.findById(id).exec();
        if (!task){
            throw new NotFoundException("Task not found");
        }
        const currentStatus= task.taskStatus
        const result = this.findStatusFlow(currentStatus,newStatus)
        if (result === false){
            throw new BadRequestException(`Cannot move task from ${currentStatus} to ${newStatus}`);
        }
        
        return await this.taskModel.findByIdAndUpdate(id, {taskStatus: newStatus}, {new:true}).exec();
    }

    // Delete Task
    async deleteTask(id: string): Promise<Task | null> {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException("Task not found");
        }

        // // Validate user is member of task's team
        // const isMember = await this.validateTeamMember(userId, task.teamId);
        // if (!isMember) {
        //     throw new ForbiddenException("User is not a member of this task's team");
        // }

        return this.taskModel.findByIdAndDelete(id).exec();
    }

    // async validateTeamMember(userId: string, teamId: string): Promise<boolean> {
    //       return this.teamMemberModel.exists({ userId, teamId });
    // }

    // async validateLead(userId:string, teamId:string){
    //     return this.teamMemberModel.exists({ userId, teamId, role: "LEAD" });
    // }

    // async isTaskApproved(taskId: string) {
    // const approval = await this.approvalModel.findOne({ taskId });
    // return approval?.status === "APPROVED";
    // }
}
 