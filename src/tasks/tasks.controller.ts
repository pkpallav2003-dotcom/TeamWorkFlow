import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateNewTaskDto } from './dto/tasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { Task } from './tasks.schema';
import { error } from 'console';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService:TasksService){}

    // Get All Tasks
    @Get()
    async getAllTasks(
        @Query('teamId') teamId:string,
        @Query('status') status?:string,
        @Query('assigneeId') assigneeId?:string,
        @Query('priority') priority?: string,
        @Query('dueBefore') dueBefore?: string,
        @Query('q') q?: string
    ){
        if(!teamId) error: "teamId Required!"
        return this.taskService.getAllTasks(teamId,status,assigneeId,priority,dueBefore,q)
    }

    // Get Tasks by their TaskID
    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }

    // Create new task
    @Post()
    async createNewTask(@Body(ValidationPipe) data: CreateNewTaskDto){
        return this.taskService.createTask(data);
    }
    
    // Update status
    @Post(':id/status')
    async updateTaskStatus(
        @Param('id') id:string ,@Body() body:{taskStatus:string}){
        return this.taskService.updateTaskStatus(id,body.taskStatus)
    }

    // Update / Make changes to the Task by Task ID
    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body(ValidationPipe) data: UpdateTasksDto){
        return this.taskService.updateTask(id, data);
    }

    // Assign Task to Team Member
    @Post(':id/assign')
    async assignTask(@Param('id') id: string, @Body() body: { assigneeId: string }){
        return this.taskService.assignTask(id, body.assigneeId);
    }

    @Post(":id/unassign")
    async unassignTask(@Param('id') id:string){
        return this.taskService.unassignTask(id)
    }

    // Delete Task by Task ID
    @Delete(':id')
    async deleteTask(@Param('id') id:string){
        return this.taskService.deleteTask(id)
    }

}
