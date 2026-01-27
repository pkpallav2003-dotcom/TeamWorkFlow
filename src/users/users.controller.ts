import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthLiteGuard } from 'src/auth/auth-lite.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
    @Post()
    async createUser(@Body() dto: CreateUserDto){
        return this.usersService.createUser(dto.name, dto.email)
    }
    @UseGuards(AuthLiteGuard)
    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') userId: string) {
        return this.usersService.getUserById(userId);
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        return this.usersService.deleteUser(userId);
    }

    @Patch(':id')
    async updateUser(@Param('id') userId: string, dto : UpdateUserDto) {
        return this.usersService.updateUser(userId, dto.name, dto.email);
    }

}
