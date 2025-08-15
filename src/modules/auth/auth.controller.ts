import { Body, Controller, Post, UnauthorizedException, UseGuards, Param, Get, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/auth-dto';
import { CreateUserDto } from '../user/dto/user-dto';
import { JwtAuthGuard } from '../auth/guard/jwt-guard';
import { CurrentUser } from '../../common/decorators/user.decorator';

class AuthTokenResponse {
  access_token: string;
}

class RegisterSuccessResponse {
  message: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Login realizado com sucesso.',
    type: AuthTokenResponse,
    schema: {
      example: { access_token: 'jwt.token.aqui' },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
    type: RegisterSuccessResponse,
    schema: {
      example: { message: 'Usuário criado com sucesso' },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);
    return { message: 'Usuário criado com sucesso' };
  }
}

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getById(@Param('id') id: string, @CurrentUser() user: any) {
    if (user.sub !== id) {
      throw new UnauthorizedException('Você só pode acessar seu próprio usuário');
    }
    // ...busca e retorna o usuário...
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: string, @CurrentUser() user: any) {
    if (user.sub !== id) {
      throw new UnauthorizedException('Você só pode deletar seu próprio usuário');
    }
    // ...deleta e retorna...
  }
}
