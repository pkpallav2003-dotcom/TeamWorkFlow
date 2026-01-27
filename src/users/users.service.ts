import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    async createUser(name: string, email: string): Promise<User> {
        const newUser = await new this.userModel({ name, email });
        return newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUserById(userId: string): Promise<User> {

        if (!isUUID(userId)) {
            throw new BadRequestException('Invalid user ID');
        }

        const user = await this.userModel.findOne({id: userId}).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }


    async deleteUser(userId: string): Promise<{ message: string, userId: string }> {
        if (!isUUID(userId)) {
            throw new BadRequestException('Invalid user ID');
        }

        const result = await this.userModel.findOneAndDelete({id: userId}).exec();
        if (!result) {
            throw new NotFoundException('User not found');
        }

        return {
            message: 'User deleted successfully',
            userId,
        }

    }

    async updateUser(userId: string, name?: string, email?: string): Promise<{ user: User, message: String }> {
        if (!isUUID(userId)) {
            throw new BadRequestException('Invalid user ID');
        }

        const user = await this.userModel.findOne({id: userId}).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        return { user: await user.save(), message: "User updated" };
    }
}
