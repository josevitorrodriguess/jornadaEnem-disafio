import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;
}

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'João Silva', description: 'Nome do usuário' })
    @IsString({ message: 'Name must be a string' })
    name?: string;

    @ApiPropertyOptional({ example: 'joao@email.com', description: 'Email do usuário' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    @ApiPropertyOptional({ example: 'novaSenha123', description: 'Senha do usuário' })
    @IsString({ message: 'Password must be a string' })
    password?: string;
}