import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma';
import { hashPassword } from 'src/config/encrypt/hash';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        data.password = await hashPassword(data.password);

        return this.prisma.user.create({ data });
    }

    async getAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        if (data.password && typeof data.password === 'string') {
            data.password = await hashPassword(data.password);
        }
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<User> {
        return this.prisma.user.delete({ where: { id } });
    }
}