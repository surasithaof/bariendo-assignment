import { HttpException, Injectable } from '@nestjs/common';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAppointmentsQuery } from './dto/get-appointment.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async getAppointments(
    queryParams: GetAppointmentsQuery,
  ): Promise<PaginationDto<AppointmentEntity>> {
    const appointments = (await this.prisma.appointments.findMany({
      where: {
        organizationId: queryParams.orgId,
        date: {
          gte: queryParams.startDate,
          lte: queryParams.endDate,
        },
      },
      skip: queryParams.skip,
      take: queryParams.limit,
      include: {
        doctor: true,
        patient: true,
        organization: true,
      },
    })) as [AppointmentEntity];

    const total = await this.prisma.appointments.count({
      where: {
        organizationId: queryParams.orgId,
        date: {
          gte: queryParams.startDate,
          lte: queryParams.endDate,
        },
      },
    });

    return {
      data: appointments,
      total: total,
      limit: queryParams.limit,
      skip: queryParams.skip,
    };
  }

  async getAppointmentById(id: number): Promise<AppointmentEntity> {
    return this.prisma.appointments.findUnique({
      where: {
        id: id,
      },
      include: {
        doctor: true,
        patient: true,
        organization: true,
      },
    });
  }

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentEntity> {
    const booked = await this.prisma.appointments.findFirst({
      where: {
        organizationId: createAppointmentDto.organizationId,
        date: createAppointmentDto.date,
      },
    });

    if (booked) {
      throw new HttpException(
        'Appointment already booked, please select another date and time',
        400,
      );
    }

    return this.prisma.appointments.create({
      data: {
        ...createAppointmentDto,
      },
      include: {
        doctor: true,
        patient: true,
        organization: true,
      },
    });
  }
}
