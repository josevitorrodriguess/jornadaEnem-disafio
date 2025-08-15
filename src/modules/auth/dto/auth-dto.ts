import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
    @ApiProperty({ example: 'usuario@email.com', description: 'E-mail do usuário' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    @IsString()
    @IsNotEmpty()
    password: string;
}