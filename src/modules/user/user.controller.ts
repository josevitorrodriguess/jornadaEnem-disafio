import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UseGuards,
    UnauthorizedException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user-dto';
import { JwtAuthGuard } from '../auth/guard/jwt-guard';
import { CurrentUser } from '../../common/decorators/user.decorator';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth() // Adiciona o ícone de cadeado no Swagger
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users returned successfully.' })
    async getAll() {
        return this.userService.getAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'User found.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden access.' })
    async getById(@Param('id') id: string, @CurrentUser() user: any) {
        if (user.sub !== id) {
            throw new UnauthorizedException('You can only access your own user data');
        }
        const userData = await this.userService.getById(id);
        if (!userData) throw new NotFoundException('User not found');
        return userData;
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden access.' })
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() user: any
    ) {
        if (user.sub !== id) {
            throw new UnauthorizedException('You can only update your own user data');
        }
        const userData = await this.userService.getById(id);
        if (!userData) throw new NotFoundException('User not found');
        await this.userService.update(id, updateUserDto);
        return { message: 'User updated successfully.' };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'User deleted successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden access.' })
    async delete(@Param('id') id: string, @CurrentUser() user: any) {
        if (user.sub !== id) {
            throw new UnauthorizedException('You can only delete your own user');
        }
        const userData = await this.userService.getById(id);
        if (!userData) throw new NotFoundException('User not found');
        await this.userService.delete(id);
        return { message: 'User deleted successfully.' };
    }
}