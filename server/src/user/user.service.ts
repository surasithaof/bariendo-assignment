import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findDuplicateUser(orgId: number, email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        unique_user_organization: {
          organizationId: orgId,
          email: email.toLowerCase(),
        },
      },
    });
  }
}
