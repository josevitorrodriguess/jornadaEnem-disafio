import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user-dto';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users returned successfully.' })
    async getAll() {
        return this.userService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'User found.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async getById(@Param('id') id: string) {
        const user = await this.userService.getById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.userService.getById(id);
        if (!user) throw new NotFoundException('User not found');
        await this.userService.update(id, updateUserDto);
        return { message: 'User updated successfully.' };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'User deleted successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async delete(@Param('id') id: string) {
        const user = await this.userService.getById(id);
        if (!user) throw new NotFoundException('User not found');
        await this.userService.delete(id);
        return { message: 'User deleted successfully.' };
    }
}