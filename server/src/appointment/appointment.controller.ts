import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
@ApiTags('appointments')
export class AppointmentController {
  private readonly appointmentService: AppointmentService;
  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  @Get()
  @ApiOkResponse({
    description: 'Appointments list',
    type: [AppointmentEntity],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAppointments() {
    return this.appointmentService.getAppointments();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Appointment list', type: AppointmentEntity })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAppointmentById(@Param('id') id: number) {
    return this.appointmentService.getAppointmentById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Appointment created',
    type: AppointmentEntity,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }
}
