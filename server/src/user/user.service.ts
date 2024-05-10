import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PatientEntity } from './entities/patient.entity';
import { DoctorEntity } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreatePatientDto } from './dto/create-patient.dto';

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

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        ...data,
        email: data.email.trim().toLowerCase(),
      },
    });
  }

  async createPatient(data: CreatePatientDto): Promise<PatientEntity> {
    return this.prisma.patient.create({
      data,
    });
  }

  async createDoctor(data: CreateDoctorDto): Promise<DoctorEntity> {
    return this.prisma.doctor.create({
      data,
    });
  }
}
