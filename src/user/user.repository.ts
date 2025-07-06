import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { User, CreateUser } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async create(user: CreateUser) {
    const hashedPassword = await bcrypt.hash(user.password || '', 10);

    return this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  async update(user: CreateUser) {
    if (!user.id) throw new Error('User not found');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  async delete(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  // Método para validar senha — útil para login
  async validatePassword(
    email: string,
    plainPassword: string,
  ): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) return false;

    return bcrypt.compare(plainPassword, user.password);
  }
}
