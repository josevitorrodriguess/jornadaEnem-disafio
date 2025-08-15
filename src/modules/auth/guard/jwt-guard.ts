import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    createParamDecorator,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Token não informado');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token inválido');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload; // agora req.user.sub = id do usuário
            return true;
        } catch {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
