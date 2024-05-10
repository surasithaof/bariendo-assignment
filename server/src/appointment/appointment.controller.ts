import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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
import { GetAppointmentsQuery } from './dto/get-appointment.dto';
import { ApiOkResponsePaginated } from 'src/shared/dto/ok-paginated.dto';

@Controller('appointments')
@ApiTags('appointments')
export class AppointmentController {
  private readonly appointmentService: AppointmentService;
  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  @Get()
  @ApiOkResponsePaginated(AppointmentEntity)
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAppointments(@Query() queryParams: GetAppointmentsQuery) {
    return this.appointmentService.getAppointments(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Appointment list', type: AppointmentEntity })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAppointmentById(@Param('id', ParseIntPipe) id: number) {
    const appointment = await this.appointmentService.getAppointmentById(id);
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }
    return appointment;
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
