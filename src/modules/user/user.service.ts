import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma';
import { comparePasswords, hashPassword } from 'src/config/encrypt/hash';


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
            const user = await this.prisma.user.findUnique({ where: { id } });

            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            const isSamePassword = await comparePasswords(
                data.password,
                user.password
            );

            if (isSamePassword) {
                delete data.password;
            } else {
                data.password = await hashPassword(data.password);
            }
        }

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }


    async delete(id: string): Promise<User> {
        return this.prisma.user.delete({ where: { id } });
    }
}