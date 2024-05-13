import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UserOrganizationEntity } from './entities/user-orgs.entity';
import { CreateUserOrgDto } from './dto/create-user-org.dto';
import { UserOrganizationDto } from './dto/user-orgs.dto';
import { UserDto } from './dto/user.dto';
import { PatientDto } from './dto/patient.dto';
import { DoctorDto } from './dto/doctor.dto';
import { UserEntity } from './entities/user.entity';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: false,
        salt: false,
        isSuperAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserById(id: number): Promise<UserDto> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        password: false,
        salt: false,
        isSuperAdmin: true,
        createdAt: true,
        updatedAt: true,
        usersOrganization: {
          select: {
            id: true,
            userId: true,
            organizationId: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            patient: {
              select: {
                id: true,
                userOrganizationId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            doctor: {
              select: {
                id: true,
                userOrganizationId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            organization: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    return this.prisma.user.create({
      data: {
        ...data,
        email: data.email.trim().toLowerCase(),
      },
    });
  }

  async createPatient(data: CreatePatientDto): Promise<PatientDto> {
    return this.prisma.patient.create({
      data,
    });
  }

  async createDoctor(data: CreateDoctorDto): Promise<DoctorDto> {
    return this.prisma.doctor.create({
      data,
    });
  }

  async getUserOrgsByUserId(userId: number): Promise<UserOrganizationDto[]> {
    return this.prisma.userOrganization.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        organization: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        organizationId: true,
        user: {
          select: {
            id: true,
            email: true,
            isSuperAdmin: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUserOrg(
    userId: number,
    orgId: number,
    createUserOrgDto: CreateUserOrgDto,
  ): Promise<UserOrganizationEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return null;
    }

    const org = await this.prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });
    if (!org) {
      return null;
    }

    const existing = await this.prisma.userOrganization.findFirst({
      where: {
        userId: userId,
        organizationId: orgId,
      },
    });
    if (existing) {
      return null;
    }

    const newUserOrg = await this.prisma.userOrganization.create({
      data: {
        userId: userId,
        organizationId: orgId,
        role: createUserOrgDto.role,
      },
    });

    if (createUserOrgDto.role === Role.Patient) {
      await this.createPatient({
        userOrganizationId: newUserOrg.id,
      });
    } else if (createUserOrgDto.role === Role.Doctor) {
      await this.createDoctor({
        userOrganizationId: newUserOrg.id,
      });
    }

    return newUserOrg;
  }
}
