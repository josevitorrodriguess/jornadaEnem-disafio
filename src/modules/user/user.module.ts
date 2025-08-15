import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [PrismaModule], 
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }