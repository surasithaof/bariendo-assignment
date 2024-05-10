import { Injectable } from '@nestjs/common';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor() {}

  async getAppointments(): Promise<AppointmentEntity[]> {
    return [];
  }

  async getAppointmentById(id: number): Promise<AppointmentEntity> {
    console.log('id: ', id);
    return new AppointmentEntity();
  }

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentEntity> {
    console.log('createAppointmentDto: ', createAppointmentDto);
    return new AppointmentEntity();
  }
}
